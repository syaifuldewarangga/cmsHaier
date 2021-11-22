import React from "react"

function ChoiceAnswer(props) {
    function coba (){
        // if('coba' === 'coba') {
        //     return (
        //         props.data.map((answer) => (
        //             <div class="form-check mb-3" key={answer.id}>
        //                 <input class="form-check-input" type="radio" id="flexRadioDefault2" disabled />
        //                 <label class="form-check-label">
        //                     { answer.answer }
        //                 </label>
        //             </div>
        //         ))
        //     )
        // } else {
            return (
                props.data.map((answer) => (
                    <div class="form-check mb-3" key={answer.id}>
                        <input class="form-check-input" type="radio" id="flexRadioDefault2" disabled />
                        <label class="form-check-label">
                            { answer.answer }
                        </label>
                    </div>
                ))
            )
        // }
    }
    return (
        <div>
            {coba()}
            {/* {
            props.data.map((answer) => (
                <div class="form-check mb-3" key={answer.id}>
                    <input class="form-check-input" type="radio" id="flexRadioDefault2" disabled />
                    <label class="form-check-label">
                        { answer.answer }
                    </label>
                </div>
            ))
        } */}
        </div>
    )
}

export default ChoiceAnswer