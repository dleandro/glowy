import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { authService } from "../utils/auth";
import type {
  SkinType,
  SkinTone,
  SkinConcern,
  AgeRange,
  HairType,
  User,
} from "../types";

interface RegisterPageProps {
  onRegisterSuccess: (user: User) => void;
  onSwitchToLogin: () => void;
  onBackToHome?: () => void;
}

const RegisterPage: Component<RegisterPageProps> = (props) => {
  // Basic info
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");

  // Profile info
  const [skinType, setSkinType] = createSignal<SkinType>("normal");
  const [skinTone, setSkinTone] = createSignal<SkinTone>("medium");
  const [skinConcerns, setSkinConcerns] = createSignal<SkinConcern[]>([]);
  const [ageRange, setAgeRange] = createSignal<AgeRange>("26-35");
  const [hairType, setHairType] = createSignal<HairType>("straight");

  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const toggleSkinConcern = (concern: SkinConcern) => {
    setSkinConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setError("");

    if (password() !== confirmPassword()) {
      setError("Passwords do not match");
      return;
    }

    if (password().length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const user = authService.register(email(), password(), name(), {
      skinType: skinType(),
      skinTone: skinTone(),
      skinConcerns: skinConcerns(),
      ageRange: ageRange(),
      hairType: hairType(),
      preferredBrands: [],
      allergies: [],
    });

    if (user) {
      authService.login(email(), password());
      props.onRegisterSuccess(user);
    } else {
      setError("Email already registered");
    }

    setLoading(false);
  };

  return (
    <div class="min-h-screen bg-[#f3f2ed] py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <button
            onClick={props.onBackToHome}
            class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
          <img
            class="mx-auto h-16 w-auto"
            src="/images/glowy-logo.png"
            alt="Glowy"
          />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={props.onSwitchToLogin}
              class="font-medium text-pink-600 hover:text-pink-500 cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          class="bg-white shadow-md rounded-lg p-8 space-y-6"
        >
          {error() && (
            <div class="rounded-md bg-red-50 p-4">
              <div class="text-sm text-red-800">{error()}</div>
            </div>
          )}

          {/* Basic Information */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b pb-2">
              Basic Information
            </h3>

            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
              />
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                />
              </div>

              <div>
                <label
                  for="confirm-password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Confirm Password *
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  value={confirmPassword()}
                  onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>

          {/* Cosmetic Profile */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b pb-2">
              Your Beauty Profile
            </h3>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  for="skin-type"
                  class="block text-sm font-medium text-gray-700"
                >
                  Skin Type *
                </label>
                <select
                  id="skin-type"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 cursor-pointer"
                  value={skinType()}
                  onChange={(e) =>
                    setSkinType(e.currentTarget.value as SkinType)
                  }
                >
                  <option value="oily">Oily</option>
                  <option value="dry">Dry</option>
                  <option value="combination">Combination</option>
                  <option value="sensitive">Sensitive</option>
                  <option value="normal">Normal</option>
                </select>
              </div>

              <div>
                <label
                  for="skin-tone"
                  class="block text-sm font-medium text-gray-700"
                >
                  Skin Tone *
                </label>
                <select
                  id="skin-tone"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 cursor-pointer"
                  value={skinTone()}
                  onChange={(e) =>
                    setSkinTone(e.currentTarget.value as SkinTone)
                  }
                >
                  <option value="fair">Fair</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="tan">Tan</option>
                  <option value="deep">Deep</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Skin Concerns (select all that apply)
              </label>
              <div class="grid grid-cols-2 gap-2">
                {(
                  [
                    "acne",
                    "aging",
                    "dryness",
                    "oiliness",
                    "sensitivity",
                    "dark_spots",
                    "redness",
                    "large_pores",
                  ] as SkinConcern[]
                ).map((concern) => (
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      checked={skinConcerns().includes(concern)}
                      onChange={() => toggleSkinConcern(concern)}
                    />
                    <span class="ml-2 text-sm text-gray-700 capitalize">
                      {concern.replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  for="age-range"
                  class="block text-sm font-medium text-gray-700"
                >
                  Age Range *
                </label>
                <select
                  id="age-range"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 cursor-pointer"
                  value={ageRange()}
                  onChange={(e) =>
                    setAgeRange(e.currentTarget.value as AgeRange)
                  }
                >
                  <option value="16-25">16-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-55">46-55</option>
                  <option value="55+">55+</option>
                </select>
              </div>

              <div>
                <label
                  for="hair-type"
                  class="block text-sm font-medium text-gray-700"
                >
                  Hair Type
                </label>
                <select
                  id="hair-type"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 cursor-pointer"
                  value={hairType()}
                  onChange={(e) =>
                    setHairType(e.currentTarget.value as HairType)
                  }
                >
                  <option value="straight">Straight</option>
                  <option value="wavy">Wavy</option>
                  <option value="curly">Curly</option>
                  <option value="coily">Coily</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading()}
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 cursor-pointer"
            >
              {loading() ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
