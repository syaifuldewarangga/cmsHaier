import React, { Component } from "react";
import FormProduct from "../component/product/detailProduct/formProduct/FormProduct";
import ProductSlider from "../component/product/detailProduct/productSlider/ProductSlider";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
  

class DetailProduct extends Component 
{
    state = ({
        product: []
    })
    async getDetailProductFromAPI(id) {
        const token = localStorage.getItem('access_token')
        await axios.get(this.props.base_url + 'register-product/product', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            params: {
                id: id
            }
        }).then((res) => {
            let data = res.data
            this.setState({
                product: data
            })
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getDetailProductFromAPI(id)
    }
    render () {
        return (
            <div>
                <ProductSlider />
                <FormProduct 
                    data={this.state.product}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        base_url: state.BASE_URL
    }
}


export default withRouter(connect(mapStateToProps, null)(DetailProduct));