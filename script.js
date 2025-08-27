const form = document.getElementById("form");
const avatar = document.getElementById("profile-image");
const profileName = document.getElementById("name");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const userLocation = document.getElementById("location");
const link = document.getElementById("link");
const twitter = document.getElementById("twitter");
const building = document.getElementById("building");
const join = document.getElementById("join");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const username = formData.get("search-user");

  fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("User not found");
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      join.textContent = `Joined at ${new Date(data.created_at).toDateString()}`;
      avatar.src = data?.avatar_url || "assets/avatar.png";
      profileName.textContent = data?.login || "No Name";
      bio.textContent = data.bio || "This profile has no bio";
      repos.textContent = data?.public_repos ?? 0;
      following.textContent = data?.following ?? 0;
      followers.textContent = data?.followers ?? 0;
      userLocation.textContent = data.location || "Not available";
      building.textContent = data.company || "Not available";
      twitter.textContent = data.twitter_username || "Not available";
      link.textContent = data.html_url || "Not available";
    })
    .catch((err) => {
      alert(err.message);
    });
});