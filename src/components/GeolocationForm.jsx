import React from 'react';
// import { useForm } from 'react-hook-form';


export default class GeolocationForm extends React.Component {

    /* Initial State */
    state = {
        data: {},

        location : {
            enabled: false
        },

        pickCam: {
            enabled: false,
            photoUrl: ''
        }
    }

    /* 
    Antes do componente ser montado pedimos a permissao da localização 
    */
    UNSAFE_componentWillMount() {

        // get geo localition
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {

                const { data, location } = this.state;
                data.location = { coords: pos.coords }
                location.enabled = true;
                location.coords = pos.coords;



                this.setState({ data, location });
            })
        } else {
            this.setState({ location: { enabled: false }})
        }

    }

    /*
    Quando clicar no botao verde 'Pick Cam' para habilitar a camera
    */
    enableCamera = () => {

        
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                this.setState({
                    pickCam: {
                        enabled: true
                    }
                }, () => {
                    this.video.srcObject = stream
                    this.video.constrols = true;
                    this.video.play();
                });

            })
        }
    }

    /*
    Para tirar foto
    */
    takePicture = () => {

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;

        const ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.video, 0 , 0, this.canvas.width, this.canvas.height);
        const photo = this.canvas.toDataURL('image/jpg');

        this.setState({
            data: { ...this.state.data, photo },
            pickCam: {
                ...this.state.pickCam,
                takePicture: true,
                enabled: false
            }
        });

    }

    /* Método generico para pegar o valor de um elemento do formularo */
    changeFormEl = (e) => {
        const {data} = this.state;
        data[e.target.name] = e.target.value;
        this.setState({ data }, () => console.log(data));
    }


    /* 
    MÉTODO PARA ENVIAR OS DADOS VIA API
    */
    sendData = (e) => {
        e.preventDefault();
        console.log(this.state.data);

        /// ========> CALL YOUT API HERE !!! <========
    }

    render() {
        const { location, pickCam, data} = this.state;
        console.log(location)

        return location.enabled ? (
            <div>
                <form onSubmit={this.sendData}>

                    <div className="alert alert-primary">
                        <strong>Your Location:</strong> { location.coords.latitude } | {location.coords.longitude}
                    </div>

                    <div className="form-group">
                        <label htmlFor="#">Select in combo box</label>
                        {/* <input type="text" className="form-control"/> */}
                        <select name="category" id="category" className="form-control"
                            onChange={this.changeFormEl}>
                            <option value="item1">Item 1</option>
                            <option value="item2">Item 2</option>
                            <option value="item3">Item 3</option>
                            <option value="item4">Item 4</option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="#">Pick Cam</label>
                        <div>
                            { !pickCam.enabled ? <button type="button" className="btn btn-primary" onClick={this.enableCamera}>Pick Cam</button> : ''}
                            { pickCam.enabled && <button type="button" className="btn btn-success"
                            onClick={this.takePicture}> Take Picture</button>} 
                        </div>
                    </div> 

                    { pickCam.enabled && (<video ref={video => this.video = video} onChange={this.onChangeVideo} ></video>) }
                   


                   {
                    data.photo && data.location && (<button className="btn btn-success" >Save Data</button>  )
                   }
                </form>
            </div>
        ) : ( <span className="alert alert-danger">Localização Desabilitada</span>);
    }
}