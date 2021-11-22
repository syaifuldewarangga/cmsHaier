import React, { Component } from "react";
import BlogSlider from "../component/blog/blogSlider/BlogSlider";
import Product from "../component/product/product/Product";
import ButtonScannerSection from "../component/scan/buttonScannerSection/ButtonScannerSection";
import CameraScan from "../component/scan/cameraScan/CameraScan";
import ManualScan from "../component/scan/manualScan/ManualScan";
import ImageSlider from "../component/slider/ImageSlider";

class LandingPage extends Component
{
    state = ({
        cameraStatus: false,
    })
    handleButtonScanner = () => {
        this.setState({
            cameraStatus: true,
        })
    }

    handleChangeCameraStatus = (newValue) => {
        this.setState({
            cameraStatus: newValue,
        })
    }
    render() {
        return (
            <div>
                <ImageSlider />
                <div
                    onClick={this.handleButtonScanner}
                >
                    <ButtonScannerSection/>
                </div>
                <Product/>
                <BlogSlider />
                <ManualScan />
                <CameraScan 
                    cameraStatus={this.state.cameraStatus}
                    onChangeCameraStatus={(value) => this.handleChangeCameraStatus(value)}
                />
            </div>
        );
    }
}

export default LandingPage;