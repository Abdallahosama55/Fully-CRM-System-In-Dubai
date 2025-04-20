import { useContext, useState, useEffect } from "react";
import { Row, Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";

import PostsService from "services/posts.service";
import UnAuthService from "services/unauth.service";
import { axiosCatch } from "utils/axiosUtils";
import userContext from "context/userContext";
import Post from "./Post";
import { useParams } from "react-router-dom";

export default function Posts({ postsList, setPostsList }) {
  const { user } = useContext(userContext);
  const [postsOffset, setPostsOffset] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const { communityId } = useParams();

  const loadPostsList = () => {
    user
      ? PostsService.getPosts(communityId, postsOffset, 8, postsList[0]?.createdAt)
          .then(({ data }) => {
            const newList = postsList.concat(data.data.rows);
            setPostsList(newList);
            setPostsOffset((prev) => prev + data.data.rows.length);

            if (postsOffset >= data.data.count) {
              setHasMoreItems(false);
            } else {
              setHasMoreItems(true);
            }
          })
          .catch((err) => {
            axiosCatch(err);
          })
      : UnAuthService.getPosts(postsOffset, 8, postsList[0]?.createdAt)
          .then(({ data }) => {
            const newList = postsList.concat(data.data.rows);
            setPostsList(newList);
            setPostsOffset((prev) => prev + data.data.rows?.length);

            if (postsOffset >= data.data.count) {
              setHasMoreItems(false);
            } else {
              setHasMoreItems(true);
            }
          })
          .catch((err) => {
            axiosCatch(err);
          });
  };

  useEffect(() => {
    loadPostsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section className="post-section mt-1">
      <InfiniteScroll
        next={loadPostsList}
        hasMore={hasMoreItems}
        dataLength={postsList.length}
        style={{ overflowX: "hidden" }}>
        {postsList.map((post) => (
          <div key={post.id}>
            <Post
              id={post.id}
              avatarPic={post.account.profileImage}
              userName={post.account.fullName}
              date={post.createdAt}
              postImages={post.files}
              postDescription={post.description}
              likes={post.likes}
              communityPostLikes={post.communityPostLikes}
              commentsCount={post.comments}
              isLiked={
                post.communityPostLikes?.filter((post) => post.accountId === user.accountId).length
              }
              accountId={post.accountId}
              isHidden={post.isPrivate}
              commentList={post.comment}
              setPostsList={setPostsList}
              type={post.type}
              eventId={post.eventId}
              eventData={post.eventData ? JSON.parse(post.eventData) : {}}
            />
          </div>
        ))}
      </InfiniteScroll>
      {hasMoreItems ? (
        <Row align="middle" justify="center">
          <LoadingOutlined />
        </Row>
      ) : (
        <Row justify="center">
          <Typography.Text>No more posts to show.</Typography.Text>
        </Row>
      )}
    </section>
  );
}
