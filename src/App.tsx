import React, { useState } from "react";
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
  mealPlannerUrl,
  updateHealthConditionUrl,
  editUserInfoUrl,
  editPersonalDataUrl,
  notificationsUrl,
  changePasswordUrl,
  moderatorChangePasswordUrl,
  updatePasswordUrl,
  moderatorUpdatePasswordUrl,
  moderatorEditInfoUrl,
} from "./assets/data";
import ModeratorAddIngredient from "./pages/Moderator/ModeratorAddIngredient";
import ModeratorEditIngredient from "./pages/Moderator/ModeratorEditIngredient";
import RecipeEditForm from "./pages/RecipeEditForm";
import PersonalData from "./pages/PersonalData";
import MealPlanner from "./pages/MealPlanner";
import UpdateHealthCondition from "./pages/UpdateHealthCondition";
import EditUserInfo from "./pages/EditUserInfo";
import EditPersonalData from "./pages/EditPersonalData";
import UserNotification from "./pages/UserNotification";
import Page404 from "./pages/Page404";
import ChangePassword from "./pages/ChangePassword";
import UpdatePassword from "./pages/UpdatePassword";

// ... (other imports remain the same)

interface NavLayoutProps {
  children: React.ReactNode;
  toggleDarkMode?: () => void;
  dark?: boolean;
}

const NavLayout: React.FC<NavLayoutProps> = ({
  children,
  toggleDarkMode,
  dark,
}) => (
  <div className="w-full flex flex-col justify-center items-start flex-grow">
    <Navbar toggleDarkMode={toggleDarkMode} dark={dark} />
    {children}
  </div>
);

function App() {
  const adjustedHeight = useAdjustedHeight();
  // const [darkMode, setDarkMode] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    console.log("hello");

    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode)); // Save new mode to local storage
      return newMode;
    });
  };

  // useEffect(() => {
  //   // Save dark mode state to local storage on change
  //   localStorage.setItem('darkMode', JSON.stringify(darkMode));
  // }, [darkMode]);

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="w-full flex justify-center items-center dark:bg-neutral-900 dark:text-white">
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
            <Route
              path={updateHealthConditionUrl}
              element={
                <NavLayout>
                  <UpdateHealthCondition />
                </NavLayout>
              }
            />

            <Route
              path={editUserInfoUrl}
              element={
                <NavLayout>
                  <EditUserInfo />
                </NavLayout>
              }
            />
            <Route
              path={changePasswordUrl}
              element={
                <NavLayout>
                  <ChangePassword />
                </NavLayout>
              }
            />
            <Route
              path={moderatorChangePasswordUrl}
              element={
                <NavLayout>
                  <ChangePassword />
                </NavLayout>
              }
            />

            {/* Protected user routes */}
            <Route path="/user" element={<ProtectedRoute />}>
              <Route
                path={homeUrl}
                element={
                  <NavLayout toggleDarkMode={toggleDarkMode} dark={darkMode}>
                    <Home />
                  </NavLayout>
                }
              />
              <Route
                path={searchUrl}
                element={
                  <NavLayout toggleDarkMode={toggleDarkMode} dark={darkMode}>
                    <Search />
                  </NavLayout>
                }
              />
              <Route
                path="/user/page-404"
                element={
                  <NavLayout toggleDarkMode={toggleDarkMode} dark={darkMode}>
                    <Page404 />
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
                path={updatePasswordUrl}
                element={
                  <NavLayout>
                    <UpdatePassword />
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
              <Route
                path={editPersonalDataUrl}
                element={
                  <NavLayout>
                    <EditPersonalData />
                  </NavLayout>
                }
              />
              <Route
                path={mealPlannerUrl}
                element={
                  <NavLayout>
                    <MealPlanner />
                  </NavLayout>
                }
              />
              <Route
                path={notificationsUrl}
                element={
                  <NavLayout>
                    <UserNotification />
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
                path={moderatorEditInfoUrl}
                element={
                  <NavLayout>
                    <EditUserInfo />
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
                    <NavLayout toggleDarkMode={toggleDarkMode} dark={darkMode}>
                      <ModeratorHome />
                    </NavLayout>
                  }
                />
                <Route
                  path={moderatorSearchUrl}
                  element={
                    <NavLayout toggleDarkMode={toggleDarkMode} dark={darkMode}>
                      <ModeratorSearch />
                    </NavLayout>
                  }
                />
                <Route
                  path={moderatorUpdatePasswordUrl}
                  element={
                    <NavLayout>
                      <UpdatePassword />
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
    </div>
  );
}

export default App;
