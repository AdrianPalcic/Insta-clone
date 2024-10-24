import useShowToast from "./useShowToast";
import { useState } from "react";


    {/* Funkcija koja daje useru da odabere sliku za profilnu te je zapamti */}

const usePreviewImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSize = 2 * 1024 * 1024 // 2MB;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
 
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSize) {
                showToast("Error","File size is too large. Please select a file under 2MB.","error");
                setSelectedFile(null);
                return
            }

            const reader = new FileReader();
            reader.onLoadend = () => {
                setSelectedFile(reader.result);
            }

            reader.readAsDataURL(file);

        } else {
            showToast("Error", "Please select an Image", "error");
            setSelectedFile(null);
        }
    }
    return { selectedFile, handleImageChange, setSelectedFile }
}

export default usePreviewImage