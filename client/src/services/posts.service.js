import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/post/";

// to fetch the new posts with no duplicate of old
const getPosts = (communityId, offset = 0, limit = 8, lastCreatedAt = new Date()) => {
  return axios.get(
    SERVICE_BASE +
      `list/${communityId}?limit=${limit}&offset=${offset}&lastCreatedAt=${lastCreatedAt}`,
  );
};

const getPostById = (communityId, postId) => {
  return axios.get(SERVICE_BASE + `get-by-id/${communityId}/${postId}`);
};

const getMyPosts = (communityId, offset = 0, limit = 8, lastCreatedAt = new Date()) => {
  return axios.get(
    SERVICE_BASE +
      `my-posts/${communityId}?limit=${limit}&offset=${offset}&lastCreatedAt=${lastCreatedAt}`,
  );
};

const getCustomerPosts = (id, offset = 0, limit = 8, lastCreatedAt = new Date()) => {
  return axios.get(
    SERVICE_BASE +
      `customer-posts/${id}?limit=${limit}&offset=${offset}&lastCreatedAt=${lastCreatedAt}`,
  );
};

const getPostComments = (id, offset = 0, limit = 3, lastCreatedAt = new Date()) => {
  return axios.get(
    SERVICE_BASE +
      `get-comments/${id}?offset=${offset}&limit=${limit}&lastCreatedAt=${lastCreatedAt}`,
  );
};

const addPostComment = (postId, comment) => {
  return axios.post(SERVICE_BASE + `add-comment/${postId}`, {
    description: comment,
  });
};

const togglePostLike = (postId) => {
  return axios.patch(SERVICE_BASE + `like-unlike/${postId}`);
};

const createPost = ({ communityId, content, media, formData }) => {
  if (formData) {
    formData.append("communityId", communityId);
    return axios.post(SERVICE_BASE + `create`, formData);
  }
  return axios.post(SERVICE_BASE + `create`, {
    description: content,
    files: media,
    communityId,
  });
};

const deletePost = (postId) => {
  return axios.delete(SERVICE_BASE + `delete-post/${postId}`);
};

const deleteComment = (commentId) => {
  return axios.delete(SERVICE_BASE + `delete-comment/${commentId}`);
};

const hideUnhidePost = (postId) => {
  return axios.patch(SERVICE_BASE + `hide-unhide/${postId}`);
};

const editPost = (postId, formData) => {
  return axios.put(SERVICE_BASE + `edit/${postId}`, formData);
};

const PostsService = {
  getPosts,
  getMyPosts,
  getCustomerPosts,
  getPostComments,
  addPostComment,
  togglePostLike,
  createPost,
  deletePost,
  deleteComment,
  hideUnhidePost,
  getPostById,
  editPost,
};

export default PostsService;
