import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import {
  signUpUrl,
  loginUrl,
  homeUrl,
  recipeDetailUrl,
  postUrl,
  mySpaceUrl,
  welcomeUrl,
  searchUrl,
  moderatorSignUpUrl,
  moderatorLoginUrl,
  moderatorHomeUrl,
  moderatorSearchUrl,
  moderatorRecipeDetailUrl,
  moderatorSpaceUrl,
} from "./assets/data";
import RecipeDetail from "./pages/RecipeDetail";
import NewRecipeForm from "./pages/NewRecipeForm";
import SignUp from "./pages/SignUp";
import useAdjustedHeight from "./hooks/useAdjustedHeight";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MySpace from "./pages/MySpace";
import Loading from "./pages/Loading";
import Search from "./pages/Search";
import ModeratorSignUp from "./pages/Moderator/ModeratorSignUp";
import ModeratorLogin from "./pages/Moderator/ModeratorLogin";
import ModeratorHome from "./pages/Moderator/ModeratorHome";
import ModeratorSearch from "./pages/Moderator/ModeratorSearch";
import ModeratorRecipeDetail from "./pages/Moderator/ModeratorRecipeDetail";
import ModeratorSpace from "./pages/Moderator/ModeratorSpace";
import ProtectedRoute, { ModeratorProtectedRoute } from "./hooks/userAuthGuard";

interface NavLayoutProps {
  children: any;
}

const NavLayout = ({ children }: NavLayoutProps) => (
  <div className="w-full flex flex-col justify-center items-start">
    <Navbar />
    {children}
  </div>
);

function App() {
  const adjustedHeight = useAdjustedHeight();

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="w-full overflow-x-hidden flex flex-col justify-start items-center max-w-[800px]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          height: `calc(${adjustedHeight}px)`,
        }}
      >
        <div className="mt-[56px]"></div>
        <Routes>
          <Route
            path={loginUrl}
            element={
              <NavLayout>
                <Login />
              </NavLayout>
            }
          />
          <Route
            path={signUpUrl}
            element={
              <NavLayout>
                <SignUp />
              </NavLayout>
            }
          />

          <Route path={welcomeUrl} element={<Loading />} />

          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route
                    path={homeUrl}
                    element={
                      <NavLayout>
                        <Home />
                      </NavLayout>
                    }
                  />
                  <Route
                    path={searchUrl}
                    element={
                      <NavLayout>
                        <Search />
                      </NavLayout>
                    }
                  />
                  <Route
                    path={`${recipeDetailUrl}/:id`}
                    element={
                      <NavLayout>
                        <RecipeDetail />
                      </NavLayout>
                    }
                  />
                  <Route
                    path={postUrl}
                    element={
                      <NavLayout>
                        <NewRecipeForm />
                      </NavLayout>
                    }
                  />
                  <Route
                    path={mySpaceUrl}
                    element={
                      <NavLayout>
                        <MySpace />
                      </NavLayout>
                    }
                  />
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/moderator/*"
            element={
              <ModeratorProtectedRoute>
                <Route
                  path={moderatorSignUpUrl}
                  element={
                    <NavLayout>
                      <ModeratorSignUp />
                    </NavLayout>
                  }
                />
                <Route
                  path={moderatorLoginUrl}
                  element={
                    <NavLayout>
                      <ModeratorLogin />
                    </NavLayout>
                  }
                />
                <Route
                  path={moderatorHomeUrl}
                  element={
                    <NavLayout>
                      <ModeratorHome />
                    </NavLayout>
                  }
                />
                <Route
                  path={moderatorSearchUrl}
                  element={
                    <NavLayout>
                      <ModeratorSearch />
                    </NavLayout>
                  }
                />
                <Route
                  path={`${moderatorRecipeDetailUrl}/:id`}
                  element={
                    <NavLayout>
                      <ModeratorRecipeDetail />
                    </NavLayout>
                  }
                />
                <Route
                  path={moderatorSpaceUrl}
                  element={
                    <NavLayout>
                      <ModeratorSpace />
                    </NavLayout>
                  }
                />
              </ModeratorProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
