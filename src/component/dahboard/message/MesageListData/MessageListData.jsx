import React from "react";

const MessageListData = (props) => {
    return (
        <tr>
            <td className="align-middle">
                <div className="d-flex justify-content-start">
                    <button 
                        className="btn d-flex btn-danger me-3 btn-sm" 
                        onClick={() => props.remove(props.data.id)}
                    >
                        <span className="material-icons-outlined md-18" > 
                            delete
                        </span>
                    </button>
                </div>
            </td>
            <td>{props.data.name}</td>
            <td>{props.data.email}</td>
            <td>{props.data.subject}</td>
            <td>{props.data.messages}</td>
        </tr>
    )
}

export default MessageListData