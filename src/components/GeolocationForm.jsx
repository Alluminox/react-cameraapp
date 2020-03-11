import React from 'react';
import { useForm } from 'react-hook-form';


export default class GeolocationForm extends React.Component {


    state = {
        location : {
            enabled: false
        },

        pickCam: {
            enabled: false
        }
    }

    UNSAFE_componentWillMount() {

        // get geo localition
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.setState({ 
                    location: {
                        enabled: true,
                        coords: pos.coords
                    }
                })
            })
        } else {
            this.setState({ location: { enabled: false }})
        }

    }


    enableCamera = () => {
        // get access to camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {

                    this.setState({
                        pickCam: {
                            enabled: true,
                            streamData: stream
                        }
                    })
                    // video.srcObject = stream
                    // video.play()
                })
                .catch(err => {
                    this.setState({
                        pickCam: {
                            enabled: false
                        }
                    })
                });
        }
    }

    render() {
        const { location, pickCam} = this.state;
        console.log(location)

        return location.enabled ? (
            <div>
                <form>

                    <div className="alert alert-success">
                        <strong>Your Location:</strong> { location.coords.latitude } | {location.coords.longitude}
                    </div>

                    <div className="form-group">
                        <label htmlFor="#">Select in combo box</label>
                        {/* <input type="text" className="form-control"/> */}
                        <select name="category" id="category" className="form-control">
                            <option value="#">Item 1</option>
                            <option value="#">Item 2</option>
                            <option value="#">Item 3</option>
                            <option value="#">Item 4</option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="#">Pick Cam</label>
                        <div>
                            { !pickCam.enabled ? <button type="button" className="btn btn-primary" onClick={this.enableCamera}>Pick Cam</button> : ''}
                            { pickCam.enabled && <button className="btn btn-success"> Take Picture</button>} 
                        </div>
                    </div> 


                    { pickCam.streamData && <video autoPlay src={pickCam.streamData} ></video> }
                </form>
            </div>
        ) : ( <span className="alert alert-danger">Localização Desabilitada</span>);
    }
}