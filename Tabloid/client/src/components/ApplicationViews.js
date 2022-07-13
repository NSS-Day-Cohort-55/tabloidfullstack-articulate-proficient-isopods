import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { UserDetails } from "./Users/UserDetails";
import { TagList } from "./tag/TagList"
import {PostList} from "../modules/post/PostList"
import {PostList} from "./post/PostList.js"
import { UserList } from "./Users/UserList";
import { PostDetail } from "./post/PostDetail";
import { CategoryList } from "./category/CategoryList";
import { PostList } from "../modules/post/PostList";
import { UserList } from "./Users/UserList";
import { TagList } from "./tag/TagList";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <PostList /> : <Navigate to="/login" />}
          />
          <Route path="tag" element={<TagList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element ={<UserList/>} />
          <Route path="posts" element={<PostList/>}/>
          <Route path="UserDetails/:userId" element={<UserDetails/>}/>
          <Route path="/:postId/PostDetails" element={<PostDetail/>}/>
          <Route path="users" element={<UserList />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
          <Route path="category" element={<CategoryList />} />
        </Route>
      </Routes>
    </main>
  );
}
