import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProjectManagerService from 'src/store/service/ProjectManagerService';
import { setMessage } from '../../apps/message';

const initialState = {
  projects: [],
  projectDetails: [],
  projectCategories: [],
  projectSave: '',
  projectSearch: '',
  error: '',
};

export const GetProjects = createAsyncThunk(
  '/Admin/ProjectDetails/GetProjectDetails',
  async (_, thunkAPI) => {
    try {
      const response = await ProjectManagerService.GetProjects();
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetProjectDetails = createAsyncThunk(
  '/Admin/ProjectDetails/GetProjectManagers',
  async (ProjectID, thunkAPI) => {
    try {
      const response = await ProjectManagerService.GetProjectDetails(ProjectID);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetProjectCategories = createAsyncThunk(
  '/Admin/ProjectDetails/GetProjectCategories',
  async (_, thunkAPI) => {
    try {
      const response = await ProjectManagerService.GetProjectCategories();
      if (response.StatusCode !== 200) {
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue();
    }
  },
);

export const InsertProject = createAsyncThunk(
  '/Admin/ProjectDetails/postProjectDetails',
  // '/Admin/ProjectDetails/postProjectDetails',
  async (payload, thunkAPI) => {
    try {
      const response = await ProjectManagerService.InsertProject(payload);
      if (response.statusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.statusCode + ' ' + response.result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetProjectDetails());
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: 'Project Management Details Added Successfully',
          alertType: 'success',
        }),
      );
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const UpdateProjectDetails = createAsyncThunk(
  '/Admin/ProjectDetails/postProjectDetails?ProjectID=${projectData.ProjectID}`, projectData)',
  async (projectData, thunkAPI) => {
    try {
      const response = await ProjectManagerService.UpdateProjectDetails(projectData);
      if (response.statusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.statusCode + ' ' + response.result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetProjectDetails());
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: 'Project Management Details Updated Successfully',
          alertType: 'success',
        }),
      );
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

const ProjectManagerSlice = createSlice({
  name: 'ProjectManager',
  initialState,
  reducers: {
    searchProject(state, action) {
      state.projectSearch = action.payload;
    },
    saveProject(state, action) {
      state.projectSave = action.payload;
    },
  },
  extraReducers: {
    [GetProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
    },
    [GetProjects.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [GetProjectDetails.fulfilled]: (state, action) => {
      state.projectDetails = action.payload;
    },
    [GetProjectDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [GetProjectCategories.fulfilled]: (state, action) => {
      state.projectCategories = action.payload;
    },
    [GetProjectCategories.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [InsertProject.fulfilled]: (state, action) => {
      state.projectSave = action.payload;
    },
    [InsertProject.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [UpdateProjectDetails.fulfilled]: (state, action) => {
      state.projectSave = action.payload.resultSet;
    },
    [UpdateProjectDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { searchProject, saveProject } = ProjectManagerSlice.actions;

export default ProjectManagerSlice.reducer;
