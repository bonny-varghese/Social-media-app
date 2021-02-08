import React, { useContext, useState } from 'react'
import './CreatePost.css';
import { UserContext, UserContextProvider } from './Context/User';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { storage, db } from './Firebase';
import firebase from 'firebase';

function CreatePost() {
    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    
    console.log('user from create post',user);
    const makeid=(length)=> {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    const handleChange=(e)=>{
        if (e.target.files[0]){
            setImage(e.target.files[0]);
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            var imagePreview = document.getElementById("image__preview");
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display= "block";
        }
    };
    const handleUpload=()=>{
        if (image){
            const imageName= makeid(9)
            const uploadTask = storage.ref(`images/${imageName}.jpg`)
            .put(image);
            uploadTask.on("state_changed",(snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);
            },(error)=>{
                console.log(error);
            },()=>{

                storage.ref("images").child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((imageUrl)=>{
                    
                    db.collection("posts").add ({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        photoUrl : imageUrl,
                        username : user.displayName,
                        profileUrl : user.photoURL,
                        
                    });
                });

                setCaption("");
                setImage(null);
                setProgress(0);
                document.getElementById("image__preview").style.display= "none";
                
            })
        }
    }
    return (
        
            <div className="createPost">
                {user ? (
                            <div className="createPost__loggedIn">
                                <p>Create Post</p>
                                <div className="createPost__loggedInCenter">
                                    <textarea className="createPost__textArea"
                                     rows="3"
                                     placeholder="Enter post here..."
                                     value={caption}
                                     onChange={(e)=> setCaption(e.target.value)}>                                         
                                     </textarea>
                                     <div className="createPost__imagePreview">
                                         <img id = "image__preview" alt="" />
                                     </div>
                                </div>
                                <div className="createPost__uploadImage">
                                    <label htmlFor="fileInput">
                                        <AddAPhotoIcon style={{cursor:"pointer"}}/>
                                    </label>                                    
                                    <input  id ="fileInput" type="file" accept="image/*" onChange={handleChange} />
                                    <div>
                                        <button 
                                                className="createPost__uploadBtn"
                                                onClick={handleUpload}
                                                style={{color : caption ? "#000" : "lightgrey"}}>
                                            Upload {`${progress >0 ? progress + "%":""}`}
                                        </button>
                                    </div>                                    
                                </div>
                            </div>
                        ):
                (<></> )}
            </div>
        
        
    )
}

export default CreatePost
