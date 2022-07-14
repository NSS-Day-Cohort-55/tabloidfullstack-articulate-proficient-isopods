import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { UserDetails } from "./Users/UserDetails";
import {PostList} from "./post/PostList.js"
import { UserList } from "./Users/UserList";
import {UpdateUser} from "./Users/UpdateUser"
import { TagList } from "./tag/TagList";
import { TagForm } from "./tag/TagForm";
import { TagEditForm } from "./tag/TagEditForm";
import { PostDetail } from "./post/PostDetail";
import { CategoryList } from "./category/CategoryList";
import { PostEdit } from "./post/PostEdit";
import { PostNew } from "./post/PostNew";


export default function ApplicationViews({ isLoggedIn, getLoggedInUser }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <PostList /> : <Navigate to="/login" />}
          />
          <Route path="tag" element={<TagList />} />
          <Route path="/tag/add" element={<TagForm/>}/>
          <Route path="/tag/:tagId/edit" element={<TagEditForm/>}/>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element ={<UserList/>} />
          <Route path="posts" element={<PostList/>}/>
          <Route path="UserDetails/:userId" element={<UserDetails/>}/>
          <Route path="EditUser/:userId" element={<UpdateUser/>}/>
          <Route path="/:postId/PostDetails" element={<PostDetail/>}/>
          <Route path="/:postId/Edit" element={<PostEdit/>}/>
          <Route path="new_post" element={<PostNew getLoggedInUser={getLoggedInUser}/>}/>
          <Route path="users" element={<UserList />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
          <Route path="category" element={<CategoryList />} />
        </Route>
      </Routes>
    </main>
  );
}
