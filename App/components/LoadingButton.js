

const LoadingButton = (props) => {

    var loadingStyleButton = {
        width: props.width ? props.width : "53px",
        height: "49px",
        borderRadius: "50%",
        padding: "0px",
        lineHeight: "0",
    }




    var normalStyleButton = {
        width: props.width ? props.width : "100%",
    }


    return props.color ?
        !props.onClick ?
            <button style={{ backgroundColor: props.color, transition: "all 0.3s", ...!props.loading ? normalStyleButton : loadingStyleButton }} type="submit" className="btn cs-btn-one  text-white  text-bold btn-sm  mx-auto m-0 p-1 d-block">
                {!props.loading ? props.text : <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
            </button> :
            <button onClick={() => props.onClick()} style={{ backgroundColor: props.color, transition: "all 0.3s", ...!props.loading ? normalStyleButton : loadingStyleButton }} type="submit" className="btn cs-btn-one text-bold text-white btn-sm  mx-auto m-0 p-2 d-block">
                {!props.loading ? props.text : <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
            </button>

        : !props.onClick ?
            <button style={{ transition: "all 0.3s", ...!props.loading ? normalStyleButton : loadingStyleButton }} type="submit" className="btn text-bold cs-btn-one text-white btn-sm  mx-auto m-0 p-1 d-block">
                {!props.loading ? props.text : <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
            </button> :
            <button onClick={() => props.onClick()} style={{ transition: "all 0.3s", ...!props.loading ? normalStyleButton : loadingStyleButton }} type="submit" className="btn cs-btn-one text-bold text-white btn-sm  mx-auto m-0 p-2 d-block">
                {!props.loading ? props.text : <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
            </button>

    // return !props.onClick ?
    // <button style={{ transition: "all 0.3s",  loadingStyleButton  , width:"50%"}} type="submit" className="btn cs-btn-one btn-gradient-color text-white btn-sm  mx-auto m-0 p-2 d-block">
    //     {!props.loading ? props.text : <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
    // </button> :
    // <button onClick={() => props.onClick()} style={{ transition: "all 0.3s", loadingStyleButton , width:"50%"}} type="submit" className="btn cs-btn-one btn-gradient-color text-white btn-sm  mx-auto m-0 p-2 d-block">
    //     {!props.loading ? props.text : <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
    // </button>
}


export default LoadingButton;