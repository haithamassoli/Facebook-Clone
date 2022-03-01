import React, { forwardRef, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@material-ui/icons/ReplyOutlined";
import Like from "../../../assets/images/like.png";
import Love from "../../../assets/images/love.png";
import Care from "../../../assets/images/care.png";
import ReactPlayer from "react-player";
import ReactTimeago from "react-timeago";
import Style from "./Style";
import db from "../../../firebase";

const Post = forwardRef(
  (
    { profile, username, timestamp, description, fileType, fileData, id },
    ref
  ) => {
    const classes = Style();

    const [likesCount, setLikesCount] = useState(1);
    const [commentsCount, setCommentsCount] = useState(1);
    const [comments, setComments] = useState(false);
    const [sharesCount, setSharesCount] = useState(1);
    const [likeIconOrder, setLikeIconOrder] = useState(1);
    const [loveIconOrder, setLoveIconOrder] = useState(1);
    const [careIconOrder, setCareIconOrder] = useState(1);
    const [userComment, setUserComment] = useState("");
    const [allUserComments, setAllUserComments] = useState([]);

    useEffect(() => {
      setLikesCount(Math.floor(Math.random() * 1000) + 1);
      setCommentsCount(Math.floor(Math.random() * 100) + 1);
      setSharesCount(Math.floor(Math.random() * 10) + 1);
      setLikeIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
      setLoveIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
      setCareIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
    }, []);

    const fetchComments = () => {
      db.collection("comments")
        .where("comment_id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.data());
            setAllUserComments([doc.data()]);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };
    useEffect(() => {
      fetchComments();
    }, [allUserComments]);
    // console.log(allUserComments);

    const userReply = (e) => {
      e.preventDefault();
      db.collection("comments")
        .add({
          comment_id: id,
          username: username,
          profile: profile,
          comment: userComment,
        })
        .then(() => resetState());
      fetchComments();
      console.log("userComment", userComment);
    };

    const resetState = () => {
      setUserComment("");
    };
    const Reactions = () => {
      return (
        <div className={classes.footer__stats}>
          <div>
            <img
              src={Like}
              style={{ order: `${likeIconOrder} ` }}
              alt="like-icon"
            />
            <img
              src={Love}
              style={{ order: `${loveIconOrder} ` }}
              alt="love-icon"
            />
            <img
              src={Care}
              style={{ order: `${careIconOrder} ` }}
              alt="care-icon"
            />
          </div>
          <h4>{likesCount}</h4>
          <section>
            <h4>{commentsCount} Comments</h4>
            <h4>{sharesCount} Shares</h4>
          </section>
        </div>
      );
    };

    return (
      <Paper ref={ref} className={classes.post}>
        <div className={classes.post__header}>
          <Avatar src={profile} />
          <div className={classes.header__info}>
            <h4>{username}</h4>
            <p>
              <ReactTimeago
                date={new Date(timestamp?.toDate()).toUTCString()}
                units="minute"
              />
            </p>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className={classes.post__body}>
          <div className={classes.body__description}>
            <p>{description}</p>
          </div>
          {fileData && (
            <div className={classes.body__image}>
              {fileType === "image" ? (
                <img src={fileData} alt="post" />
              ) : (
                <ReactPlayer url={fileData} controls={true} />
              )}
            </div>
          )}
        </div>
        <div className={classes.post__footer}>
          <Reactions />
          <div className={classes.footer__actions}>
            <div className={classes.action__icons}>
              <ThumbUpAltOutlinedIcon />
              <h4>Like</h4>
            </div>
            <div className={classes.action__icons}>
              <ChatBubbleOutlineOutlinedIcon />
              <h4 onClick={() => setComments(!comments)}>Comment</h4>
            </div>
            <div className={classes.action__icons}>
              <ReplyOutlinedIcon style={{ transform: "scaleX(-1)" }} />
              <h4>Share</h4>
            </div>
          </div>
          {comments && (
            <>
              <div>
                {allUserComments != null
                  ? allUserComments.map((data, index) => {
                      return (
                        <>
                          <div key={index} className={classes.comments}>
                            <Avatar
                              style={{ marginRight: "10px" }}
                              src={profile}
                            />
                            <div className="text-4xl">{username}</div>
                          </div>
                          <div style={{ margin: "10px" }}>{data.comment}</div>
                        </>
                      );
                    })
                  : ""}
              </div>

              <form style={{ width: "100%" }}>
                <input
                  type="text"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  style={{
                    width: "80%",
                    padding: "7px 14px",
                    outline: "none",
                    border: "none",
                    margin: "10px",
                  }}
                  placeholder="Write a public reply..."
                />
                <button
                  style={{
                    backgroundColor: "white",
                    padding: "7px 20px",
                    border: "none",
                    outline: "none",
                    border: "1px solid #e0e0e0",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => userReply(e)}
                >
                  reply
                </button>
              </form>
            </>
          )}
        </div>
      </Paper>
    );
  }
);

export default Post;
