export function getCategoryIcon(category) {
  if (!category) return <span />;
  const normalized = category.toLowerCase().trim();

  const icons = {
    "health & fitness": (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.126 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3" />
      </svg>
    ),
    "career development": (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 56 56">
        <path fill="currentColor" d="M9.156 50.582h37.688c4.851 0 7.265-2.344 7.265-7.148V20.629c0-4.781-2.414-7.149-7.265-7.149h-4.969v-1.476c0-4.57-2.273-6.586-6.61-6.586h-14.53c-4.102 0-6.633 2.016-6.633 6.586v1.476H9.156c-4.851 0-7.265 2.368-7.265 7.149v22.805c0 4.804 2.414 7.148 7.265 7.148m8.578-38.836c0-1.945 1.008-2.93 2.953-2.93h14.626c1.945 0 2.93.985 2.93 2.93v1.734h-20.51Zm-12.07 9.07c0-2.39 1.219-3.585 3.54-3.585h37.593c2.297 0 3.539 1.195 3.539 3.585v6.188H5.664Zm3.54 26.016c-2.321 0-3.54-1.172-3.54-3.586V30.52h13.078v1.454c0 1.922 1.102 3.023 3.047 3.023h12.422c1.922 0 3.047-1.102 3.047-3.023V30.52h13.078v12.726c0 2.414-1.242 3.586-3.539 3.586Z" />
      </svg>
    ),
    "personal growth": (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 6s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1zm10 0s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1z" />
      </svg>
    ),
  };

  return icons[normalized] || <span />;
}