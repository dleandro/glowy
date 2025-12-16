import type { Component } from "solid-js";
import { Show } from "solid-js";
import type { User } from "../types";

interface UserProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: Component<UserProfileModalProps> = (props) => {
  const formatSkinType = (skinType: string) => {
    return skinType.charAt(0).toUpperCase() + skinType.slice(1);
  };

  const formatSkinTone = (skinTone: string) => {
    return skinTone.charAt(0).toUpperCase() + skinTone.slice(1);
  };

  const formatConcern = (concern: string) => {
    return concern
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Show when={props.isOpen && props.user}>
      <div
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={props.onClose}
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">User Profile</h2>
            <button
              onClick={props.onClose}
              class="text-gray-400 hover:text-gray-600"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            {/* User Avatar and Name */}
            <div class="flex items-center space-x-4">
              <img
                src={props.user!.avatar || "https://via.placeholder.com/80"}
                alt={props.user!.name}
                class="w-20 h-20 rounded-full object-cover border-2 border-pink-600"
              />
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {props.user!.name}
                </h3>
                <p class="text-sm text-gray-500">{props.user!.email}</p>
              </div>
            </div>

            {/* Cosmetic Profile */}
            <div class="border-t border-gray-200 pt-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">
                Cosmetic Profile
              </h4>

              <div class="space-y-3">
                {/* Skin Type */}
                <div>
                  <span class="text-xs text-gray-500 block mb-1">
                    Skin Type
                  </span>
                  <div class="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-sm font-medium">
                    {formatSkinType(props.user!.profile.skinType)}
                  </div>
                </div>

                {/* Skin Tone */}
                <div>
                  <span class="text-xs text-gray-500 block mb-1">
                    Skin Tone
                  </span>
                  <div class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                    {formatSkinTone(props.user!.profile.skinTone)}
                  </div>
                </div>

                {/* Age Range */}
                <div>
                  <span class="text-xs text-gray-500 block mb-1">
                    Age Range
                  </span>
                  <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    {props.user!.profile.ageRange}
                  </div>
                </div>

                {/* Skin Concerns */}
                <Show when={props.user!.profile.skinConcerns.length > 0}>
                  <div>
                    <span class="text-xs text-gray-500 block mb-2">
                      Skin Concerns
                    </span>
                    <div class="flex flex-wrap gap-2">
                      {props.user!.profile.skinConcerns.map((concern) => (
                        <span class="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium">
                          {formatConcern(concern)}
                        </span>
                      ))}
                    </div>
                  </div>
                </Show>

                {/* Hair Type */}
                <Show when={props.user!.profile.hairType}>
                  <div>
                    <span class="text-xs text-gray-500 block mb-1">
                      Hair Type
                    </span>
                    <div class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                      {formatSkinType(props.user!.profile.hairType!)}
                    </div>
                  </div>
                </Show>

                {/* Preferred Brands */}
                <Show
                  when={
                    props.user!.profile.preferredBrands &&
                    props.user!.profile.preferredBrands.length > 0
                  }
                >
                  <div>
                    <span class="text-xs text-gray-500 block mb-2">
                      Preferred Brands
                    </span>
                    <div class="flex flex-wrap gap-2">
                      {props.user!.profile.preferredBrands!.map((brand) => (
                        <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </Show>

                {/* Allergies */}
                <Show
                  when={
                    props.user!.profile.allergies &&
                    props.user!.profile.allergies.length > 0
                  }
                >
                  <div>
                    <span class="text-xs text-gray-500 block mb-2">
                      Allergies
                    </span>
                    <div class="flex flex-wrap gap-2">
                      {props.user!.profile.allergies!.map((allergy) => (
                        <span class="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </Show>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <button
              onClick={props.onClose}
              class="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default UserProfileModal;
