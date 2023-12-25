import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  RESET_LOCAL,
} from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if (!state.favs.includes(action.payload)) {
        const newFavs = [...state.favs, action.payload];
        writeFavsToLocalStorage({ ...state, favs: newFavs });
        toast.success("Favorilere eklendi", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return { ...state, favs: newFavs };
      } else {
        return state;
      }
    case FAV_REMOVE:
      const updatedFavs = state.favs.filter(
        (fav) => fav.key !== action.payload
      );
      writeFavsToLocalStorage({ ...state, favs: updatedFavs });
      toast.success("favorilerden çıkarıldı");
      return { ...state, favs: updatedFavs };

    case FETCH_SUCCESS:
      return { ...state, loading: false, current: action.payload };

    case FETCH_LOADING:
      return { ...state, loading: true, error: "" };

    case FETCH_ERROR:
      toast.error(action.payload);
      return { ...state, loading: false, error: action.payload };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() || [] };

    case RESET_LOCAL:
      writeFavsToLocalStorage({ ...state, favs: [] });
      return { ...state, favs: [] };

    default:
      return state;
  }
}
