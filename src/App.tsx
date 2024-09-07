import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecipeDetail from "./pages/RecipeDetail";
import NewRecipeForm from "./pages/NewRecipeForm";
import SignUp from "./pages/SignUp";
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
import useAdjustedHeight from "./hooks/useAdjustedHeight";
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
  moderatorAddIngredientUrl,
  moderatorEditIngredientUrl,
  moderatorWelcomeUrl,
  editPostUrl,
  personalDataUrl,
} from "./assets/data";
import ModeratorAddIngredient from "./pages/Moderator/ModeratorAddIngredient";
import ModeratorEditIngredient from "./pages/Moderator/ModeratorEditIngredient";
import RecipeEditForm from "./pages/RecipeEditForm";
import WeightInput from "./pages/WeightInput";
import PersonalData from "./pages/PersonalData";

// ... (other imports remain the same)

interface NavLayoutProps {
  children: React.ReactNode;
}

const NavLayout: React.FC<NavLayoutProps> = ({ children }) => (
  <div className="w-full flex flex-col justify-center items-start flex-grow">
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
          <Route path={welcomeUrl} element={<Loading />} />
          <Route path={moderatorWelcomeUrl} element={<Loading />} />

          {/* Public routes */}
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

          {/* Protected user routes */}
          <Route
            path="/user"
            element={<ProtectedRoute />}
          >
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
              path={`${editPostUrl}/:id`}
              element={
                <NavLayout>
                  <RecipeEditForm />
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
            <Route
              path={personalDataUrl}
              element={
                <NavLayout>
                  <PersonalData />
                </NavLayout>
              }
            />
          </Route>

          {/* Moderator routes */}
          <Route path="/moderator">
            {/* Public moderator routes */}
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

            {/* Protected moderator routes */}
            <Route element={<ModeratorProtectedRoute />}>
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
              <Route
                path={moderatorAddIngredientUrl}
                element={
                  <NavLayout>
                    <ModeratorAddIngredient />
                  </NavLayout>
                }
              />
              <Route
                path={`${moderatorEditIngredientUrl}/:id`}
                element={
                  <NavLayout>
                    <ModeratorEditIngredient />
                  </NavLayout>
                }
              />
            </Route>
          </Route>

          {/* Redirect any unmatched routes to home */}
          <Route path="*" element={<Navigate to={homeUrl} replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;