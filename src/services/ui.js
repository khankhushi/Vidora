export const showLoading = () => {
  const loading = document.getElementById("loading");
  loading.classList.remove("hidden");
  loading.classList.add("shown");
};

export const hideLoading = () => {
  const loading = document.getElementById("loading");
  loading.classList.remove("shown");
  loading.classList.add("hidden");
};

export const alert = (message) => {
  window.alert(message);
};