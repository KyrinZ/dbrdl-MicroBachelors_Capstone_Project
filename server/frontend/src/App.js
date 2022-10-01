import "./bootstrap.min.css";
import React from "react";
import HomePage from "./homepage.js";
import ContactUs from "./contactus.js";
import AboutUs from "./aboutpage.js";

window.watsonAssistantChatOptions = {
  integrationID: "2c50c769-91b8-4e33-a4c9-cd6a0fc9c8be", // The ID of this integration.
  region: "jp-tok", // The region your integration is hosted in.
  serviceInstanceID: "db74e5ee-a888-4691-a3f8-ef7d70be2ea6", // The ID of your service instance.
  onLoad: function (instance) {
    instance.render();
  },
};
setTimeout(function () {
  const t = document.createElement("script");
  t.src =
    "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
    (window.watsonAssistantChatOptions.clientVersion || "latest") +
    "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});

class App extends React.Component {
  state = {
    pageshown: <HomePage />,
  };

  setPageHome = () => {
    this.setState({ pageshown: <HomePage /> });
  };

  setPageContactUs = () => {
    this.setState({ pageshown: <ContactUs /> });
  };

  setPageAboutUs = () => {
    this.setState({ pageshown: <AboutUs /> });
  };

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="navbar-collapse" id="navbarTogglerDemo01">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="#" onClick={this.setPageHome}>
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={this.setPageAboutUs}>
                  About Us
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#" onClick={this.setPageContactUs}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div>{this.state.pageshown}</div>
      </div>
    );
  }
}

export default App;
