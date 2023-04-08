import React, { useEffect, useState } from "react";
import CardItem from "../Card/CardItem/CardItem";
import { getallPicturesDateDesc } from "../../services/pictureService";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "../Pagination/pagination.css";

const Catalog = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const picturesPerPage = 10;

  useEffect(() => {
    try {
        getallPicturesDateDesc().then((res) => {
        setImages(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDelete = () => {
    getallPicturesDateDesc().then((res) => {
      setImages(res);
    });
  }
  
  const handleCommentAdded = () => {
    getallPicturesDateDesc().then((res) => {
      setImages(res);
    })
  }

  const indexOfLastPicture = (currentPage + 1) * picturesPerPage;
  const indexOfFirstPicture = indexOfLastPicture - picturesPerPage;
  const currentPictures = images.slice(indexOfFirstPicture, indexOfLastPicture);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };



  return (
    <div className="container">
      <h1 className="center">Всички снимки</h1>

      <div className="album">
        <CardItem data={currentPictures} onDelete={handleDelete} onCommentAdded={handleCommentAdded} />
      </div>
      <ReactPaginate
        pageCount={Math.ceil(images.length / picturesPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLabel={<AiOutlineArrowLeft />}
        nextLabel={<AiOutlineArrowRight />}
      />
    </div>
  );
};

export default Catalog;
