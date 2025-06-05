import React, { useRef, useState } from "react";
import Modal from "react-modal";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfileImageUploader.css";
import setCanvasPreview from "./SetCanvasPreview";
import axios from "axios";
import { localURL } from "../../assets/httpService/httpService"; // ajuste o caminho conforme necessário
Modal.setAppElement("#root");

const MIN_DIMENSION = 120;
const ASPECT_RATIO = 1;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
};

const ProfileImageUploader = ({
  setImageProfile,
  fileInputRef,
  modalIsOpen,
  handleOpenModal,
  handleCloseModal,
  onProfileImageUpdate,
}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [tempImage, setTempImage] = useState(null);

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
          toast.error(
            `A imagem tem uma resolução baixa (${img.width}x${img.height}). Tente carregar uma imagem maior.`
          );
          setTempImage("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          return;
        }
        setTempImage(reader.result);
        handleOpenModal();

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
    };
    reader.onerror = (error) => {
      console.error("Erro ao processar a imagem:", error);
    };
  };

  const onImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const initialCrop = makeAspectCrop(
      { unit: "%", width: 50 },
      ASPECT_RATIO,
      naturalWidth,
      naturalHeight
    );
    setCrop(centerCrop(initialCrop, naturalWidth, naturalHeight));
  };

  const handleConfirmCrop = async () => {
    if (!crop || !imgRef.current) {
      toast.error("Selecione uma área para recortar.");
      return;
    }

    const base64Image = setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    setImageProfile(base64Image);

    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        toast.error("Erro: E-mail do usuário não encontrado.");
        return;
      }

      await axios.post(
        `${localURL}/api/profile/updateProfileImage`,
        { profileImage: base64Image, email },
        {
          withCredentials: true,
        }
      );

      toast.success("Imagem de perfil atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a imagem de perfil.");
    }

    handleCloseModal();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={convertToBase64}
        style={{ display: "none" }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        onClick={(e) => e.stopPropagation()}
      >
        <ReactCrop
          crop={crop}
          circularCrop
          keepSelection
          onChange={setCrop}
          aspect={ASPECT_RATIO}
        >
          <img
            ref={imgRef}
            src={tempImage}
            alt="Profile"
            onLoad={onImageLoad}
          />
        </ReactCrop>

        <div className="modal-button-container">
          <button
            className="modal-button modal-button-confirm"
            onClick={handleConfirmCrop}
          >
            Confirmar
          </button>
          <button
            onClick={() => {
              setTempImage(null);
              handleCloseModal();
            }}
            className="modal-button modal-button-close"
          >
            Fechar
          </button>
        </div>
        {crop && (
          <canvas
            ref={previewCanvasRef}
            className="mt-4"
            style={{ display: "none" }}
          />
        )}
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ProfileImageUploader;
