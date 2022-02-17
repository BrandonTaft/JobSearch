import style from "../css/profile.module.css";

function Profile(props){

    function getSavedJobs(){
        return(
            <h1>helloworld</h1>
        )
    }

    return(
        <div className={style.profile}>
            <h1>Profile</h1>
            <div>{getSavedJobs}</div>
        </div>
    )
}

export default Profile;