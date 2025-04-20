import axios from "axios";
import "./post.css";
import React, { useEffect, useState } from "react";

const PostFeed = ({ settings }) => {
  const [posts, setposts] = useState([]);

  const { width, height, margin, padding } = settings;

  const style = {
    ...(width && { width: `${width}px` }),
    ...(height && { height: `${height}px` }),
    ...(margin && { margin: `${margin}px` }),
    ...(padding && { padding: `${padding}px` }),
  };

  const getPost = () => {
    axios.get("https://7c2a47a59c7149f798f18d83d28b8392.api.mockbin.io/").then(({ data }) => {
      setposts(data);
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div style={style} className="post-wrapper">
      {posts?.length > 0 &&
        posts?.slice(0, settings?.maxPosts || 5).map((post) => (
          <div key={post?.user?.name} className="post-card">
            <div className="card-wrapper">
              <div justify="space-between" className="post-header">
                <div className="image-wrapper">
                  <img src={post?.user?.profile_picture} alt={post?.user?.name} width={40} />
                  <div>
                    <span className="user-name">{post?.user?.name} </span>
                    <span className="post-date">{post?.date} </span>
                  </div>
                </div>
                <img src="/imgs/dots-vertical.png" alt="settings" />
              </div>
              <div className="post-content">
                <span>{post?.content}</span>
                <img alt="post-img" src={post?.image} />
              </div>
              <div className="social-numbers">
                <div>
                  <img width={24} src="/imgs/like.png" alt="likes" />
                  {post?.likes_count}
                </div>
                <div>
                  <span>{`${post?.comments_count} comments`}</span>
                  <span>{`${post?.shares_count} shares`}</span>
                </div>
              </div>
              <div className="like-share">
                <button>
                  {" "}
                  <img alt="likes" width={16} src="/imgs/likes.png" />
                  Like
                </button>
                <button icon={<img alt="share" width={16} src="/imgs/share.png" />}>Share</button>
              </div>
              <div className="add-comment">
                <img src={"/imgs/user.png"} alt="user" />
                <div className="input-wrapper">
                  <input type="text" className="comment-input" placeholder="Write a comment..." />
                  <img className="input-icon" src="/imgs/arrow.png" alt="icon" />
                </div>
              </div>
              <div className="comments-list">
                {settings?.showComments &&
                  post?.comments?.map((comment) => (
                    <div key={comment.id} className="comment-wrapper">
                      <div className="user-info">
                        <div>
                          <img
                            src={comment.user.profile_picture}
                            alt="profile_picture"
                            width={44}
                            height={44}
                          />
                          <div>
                            <label className="user-name">{comment.user.name}</label>
                            <label className="user-title">{comment.user.title}</label>
                          </div>
                        </div>
                        <div className="setting-part">
                          <label className="comments-date">{comment.date}</label>
                          <button>
                            <img src="/imgs/dots-vertical.png" alt="setting" />
                          </button>
                        </div>
                      </div>
                      <label className="comment-content">{comment.content}</label>
                      <div className="comment-action">
                        <button className="like-comment">Like</button>
                        <button>Reply</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostFeed;
