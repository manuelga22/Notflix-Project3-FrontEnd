import React, { Component, Fragment } from "react";
import { Modal } from "react-materialize";
import axios from "axios";
import "./reviews.css";
class Reviews extends Component {
  state = {
    ObjectId: "",
    reviews: [],
    loading: true,
    comment: "",
    theReview: ""
  };

  getAllReviews = () => {
    console.log(this.props.user);
    console.log(this.props);
    // axios.get(`${process.env.REACT_APP_BASEURL}/get`)
    this.props.user.favorites.forEach(async (movies, i) => {
      if (movies.movies === this.props.match.params.movieId) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASEURL}/route/getReviews/${movies._id}`
          );
          console.log(res.data.reviews.review);
          this.setState({
            reviews: res.data.reviews.review,
            loading: false
          });
        } catch (err) {
          console.log(err);
          return;
        }
      }
    });
  };
  deleteReview = review => {
    console.log(review.review);
    this.props.user.favorites.forEach(async (movies, i) => {
      console.log(movies);
      if (movies.movies === this.props.match.params.movieId) {
        console.log("here");
        try {
          await axios.post(
            `${process.env.REACT_APP_BASEURL}/route/delete/${movies._id}/${review.review}`,
            {}
          );
          this.getAllReviews();
        } catch (err) {
          console.log(err);
          return;
        }
      }
    });
  };

  updateReview = (review,e) => {
    e.preventDefault();
    console.log(review);
    this.props.user.favorites.forEach(async (movies, i) => {
      if (movies.movies === this.props.match.params.movieId) {
        try {
          await axios.post(`${process.env.REACT_APP_BASEURL}/route/update/${movies._id}/${review}/${this.state.theReview}`, {
            review: this.state.theReview
          });
          this.getAllReviews();
        } catch (err) {
          console.log(err);
        }
      }
    });
   
  };

  handleTextArea = e => {
    console.log(e.target.value)
    this.setState({
      theReview: e.target.value
    });
    console.log(this.state.theReview)
  };

  componentDidMount() {
    setTimeout(() => {
      this.getAllReviews();
    }, 500);
  }

  setStateOfComment = (review) => {
    this.setState({
    comment: review
   })
   
  };
  
  render() {
   
    return (
      <div>
        <Modal id="editReviewForm" header="Edit The Review">
            <form onSubmit={e=>this.updateReview(this.state.comment,e)}>
              <textarea
                type="text"
                name="review"
                style={{ color: "black" }}
                onChange={this.handleTextArea}
                placeholder={this.state.comment}
                required
              ></textarea>
              <button className="btn ">submit</button>
            </form>
          </Modal>
        {this.state.loading ? (
          <p>loading...</p>
        ) : (
          this.state.reviews.map(review => {

            return (
              <div className="reviewCart container ">
                <p style={{ color: "white" }}>{review}</p>
                <div className="btnReview ">
                <button
                  className="btn reviewBtn grey"
                  onClick={() => {
                    this.deleteReview({ review });
                  }}
                >
                  Delete review
                </button>
                <button
                
                  href="#editReviewForm"
                  className="modal-trigger btn reviewBtn grey"
                  onClick={(()=>{this.setStateOfComment(review)})}>
                  Edit
                </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default Reviews;
