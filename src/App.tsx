import type { Component } from "solid-js";
import { createSignal, Show, onMount } from "solid-js";
import type { Product, User } from "./types";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { appStore } from "./stores/appStore";
import { authService } from "./utils/auth";
import "./App.css";

type View = "home" | "product-detail" | "login" | "register" | "profile";

const App: Component = () => {
  const [currentView, setCurrentView] = createSignal<View>("home");
  const [selectedProduct, setSelectedProduct] = createSignal<Product | null>(
    null
  );

  // Load user from localStorage on mount
  onMount(() => {
    const user = authService.getCurrentUser();
    if (user) {
      appStore.setCurrentUser(user);
    }
  });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("product-detail");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedProduct(null);
  };

  const handleLogoClick = () => {
    setCurrentView("home");
    setSelectedProduct(null);
  };

  const handleProfileClick = () => {
    if (appStore.currentUser()) {
      setCurrentView("profile");
    } else {
      setCurrentView("login");
    }
  };

  const handleLoginSuccess = () => {
    const user = authService.getCurrentUser();
    if (user) {
      appStore.setCurrentUser(user);
    }
    setCurrentView("home");
  };

  const handleLogout = () => {
    appStore.setCurrentUser(null);
    setCurrentView("home");
  };

  const handleProfileUpdated = (user: User) => {
    appStore.setCurrentUser(user);
  };

  return (
    <div class="min-h-screen bg-[#f3f2ed]">
      <Show when={currentView() !== "login" && currentView() !== "register"}>
        <Header
          onLogoClick={handleLogoClick}
          onProfileClick={handleProfileClick}
          onProductSelect={handleProductSelect}
        />
      </Show>

      <Show when={currentView() === "home"}>
        <HomePage onProductSelect={handleProductSelect} />
      </Show>

      <Show when={currentView() === "product-detail" && selectedProduct()}>
        <ProductDetail
          product={selectedProduct()!}
          onBack={handleBackToHome}
          onLoginRequired={() => setCurrentView("login")}
        />
      </Show>

      <Show when={currentView() === "login"}>
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentView("register")}
        />
      </Show>

      <Show when={currentView() === "register"}>
        <RegisterPage
          onRegisterSuccess={handleLoginSuccess}
          onSwitchToLogin={() => setCurrentView("login")}
        />
      </Show>

      <Show when={currentView() === "profile" && appStore.currentUser()}>
        <ProfilePage
          user={appStore.currentUser()!}
          onBack={handleBackToHome}
          onLogout={handleLogout}
          onProfileUpdated={handleProfileUpdated}
        />
      </Show>
    </div>
  );
};

export default App;
