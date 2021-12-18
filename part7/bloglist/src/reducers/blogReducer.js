import blogService from '../services/blogs'
import { displayNotification } from './notificationReducer'
const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload
    case 'CREATE_BLOG':
      return [...state, action.payload]
    case 'UPDATE_BLOG':
      return state.map((obj) =>
        obj.id === action.payload.id ? action.payload : obj
      )
    case 'DELETE_BLOG':
      return state.filter((obj) => obj.id !== action.payload)
    case 'CREATE_COMMENT': {
      const blog = state.find((obj) => obj.id === action.payload.blog)
      const updatedBlog = {
        ...blog,
        comments: [
          ...blog.comments,
          { comment: action.payload.comment, id: action.payload.id },
        ],
      }

      return state.map((obj) =>
        obj.id === action.payload.blog ? updatedBlog : obj
      )
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', payload: blogs })
  }
}

export const createBlog = (object) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(object)
      if (response.error) {
        dispatch(displayNotification(response.error, 'danger'))
      } else {
        dispatch({ type: 'CREATE_BLOG', payload: response })
        displayNotification(
          `A new blog "${response.title}" by ${response.author} added`,
          'success'
        )
      }
    } catch (err) {
      dispatch(displayNotification(err.message, 'danger'))
    }
  }
}

export const updateBlog = (id, object) => {
  return async (dispatch) => {
    try {
      const response = await blogService.update(id, object)
      if (response.error) {
        dispatch(displayNotification(response.error, 'danger'))
      } else {
        dispatch({ type: 'UPDATE_BLOG', payload: response })
      }
    } catch (err) {
      dispatch(displayNotification(err.message, 'danger'))
    }
  }
}

export const likeBlog = (id, object) => {
  return async (dispatch) => {
    try {
      const response = await blogService.update(id, object)
      if (response.error) {
        dispatch(displayNotification(response.error, 'danger'))
      } else {
        dispatch({ type: 'UPDATE_BLOG', payload: response })
        displayNotification(
          `Liked blog "${response.title}" by ${response.author}`,
          'success'
        )
      }
    } catch (err) {
      dispatch(displayNotification(err.message, 'danger'))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.remove(blog.id)
      if (response.error) {
        dispatch(displayNotification(response.error, 'danger'))
      } else {
        dispatch({ type: 'DELETE_BLOG', payload: blog.id })
        dispatch(
          displayNotification(
            `Blog "${blog.title}" by ${blog.author} has been deleted`,
            'success'
          )
        )
      }
    } catch (err) {
      dispatch(displayNotification(err.message, 'danger'))
    }
  }
}

export const createComment = (id, object) => {
  return async (dispatch) => {
    try {
      const response = await blogService.createComment(id, object)
      if (response.error) {
        dispatch(displayNotification(response.error, 'danger'))
      } else {
        dispatch({ type: 'CREATE_COMMENT', payload: response })
        dispatch(displayNotification('Comment posted successfully', 'success'))
      }
    } catch (err) {
      dispatch(displayNotification(err.message, 'danger'))
    }
  }
}

export default blogReducer
