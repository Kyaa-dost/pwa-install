var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, css } from 'lit-element';
let pwainstall = class pwainstall extends LitElement {
    constructor() {
        super();
        this.manifestpath = "manifest.json";
        this.hasprompt = false;
        this.usecustom = false;
        this.explainer = "This app can be installed on your PC or mobile device.  This will allow this web app to look and behave like any other installed up.  You will find it in your app lists and be able to pin it to your home screen, start menus or task bars.  This installed web app will also be able to safely interact with other apps and your operating system. ";
        this.featuresheader = "Key Features";
        this.descriptionheader = "Description";
        this.installbuttontext = "Install";
        this.cancelbuttontext = "Cancel";
        this.iosinstallinfotext = "Tap the share button and then 'Add to Homescreen'";
        // check for beforeinstallprompt support
        this.isSupportingBrowser = window.hasOwnProperty('BeforeInstallPromptEvent');
        // handle iOS specifically
        this.isIOS = navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad');
        this.installed = false;
    }
    static get styles() {
        return css `
     :host {
       --install-button-color: linear-gradient(90deg, #1FC2C8 0%, #9337D8 169.8%);
       --modal-z-index: auto;
       --modal-background-color: white;
     }

     button {
       outline: none;
     }

     #installModal {
      background: var(--modal-background-color);
      position: fixed;
      bottom: 3em;
      top: 3em;
      left: 12em;
      right: 12em;
      font-family: sans-serif;
      box-shadow: 0px 25px 26px rgba(32, 36, 50, 0.25), 0px 5px 9px rgba(51, 58, 83, 0.53);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      padding: 0;

      animation-name: opened;
      animation-duration: 150ms;

      z-index: var(--modal-z-index);
     }

     @keyframes opened {
      from {
        transform: scale(0.8, 0.8);
        opacity: 0.4;
      }
      to {
        transform: scale(1, 1);
        opacity: 1;
      }
    }

    @keyframes mobile {
      from {
        opacity: 0.6;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        opacity: 0.2;
      }
      to {
        opacity: 1;
      }
    }

     #background {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #e3e3e3b0;
      backdrop-filter: blur(5px);

      animation-name: fadein;
      animation-duration: 250ms;
     }

     #headerContainer {
      display: flex;
      justify-content: space-between;
      margin: 40px;
      margin-bottom: 32px;
     }

     #headerContainer h1 {
       font-size: 34px;
       color: #3C3C3C;
       margin-top: 20px;
       margin-bottom: 7px;
     }

     #headerContainer img {
      height: 122px;
      width: 122px;
      background: lightgrey;
      border-radius: 10px;
      padding: 12px;
      border-radius: 24px;
      margin-right: 24px;
     }

     #buttonsContainer {
      display: flex;
      justify-content: flex-end;
      position: relative;
      bottom: -4em;
      height: 100px;

      background:#dedede75;
      margin-top: auto;
      margin-bottom: 63px;
      width: 100%;
      right: 0em;
      border-radius: 0px 0px 12px 12px;
     }

     #openButton, #installButton, #installCancelButton {
      text-align: center;
      align-content: center;
      align-self: center;
      vertical-align: middle;
      justify-self: flex-end;
      line-height: 200%;
      flex: 0 0 auto;
      display: inline-block;
      background: #0078d4;
      color: #ffffff;
      cursor: pointer;
      border: solid 1px rgba(0, 0, 0, 0);
      outline: none;
     }

     #installButton, #installCancelButton {
      min-width: 130px;
      margin-right: 30px;
      background: var(--install-button-color);
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      padding-top: 10px;
      padding-bottom: 9px;
      padding-left: 20px;
      padding-right: 20px;
      outline: none;
      color: white;
     }

     #closeButton {
      background: transparent;
      border: none;
      color: black;
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 4px;
      padding-bottom: 4px;
      border-radius: 20px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
      align-self: self-end;
     }

     #contentContainer {
       margin-left: 40px;
       margin-right: 40px;
     }

     #contentContainer h3 {
      font-size: 22px;
      color: #3C3C3C;
      margin-bottom: 12px;
     }

     #contentContainer p {
      font-size: 14px;
      color: #3C3C3C;
     }

     #featuresScreenDiv {
      display: flex;
      justify-content: space-between;
      margin-right: 20px;
     }

     #featuresScreenDiv h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 225%;
      margin-top: 0px;
     }

     #keyFeatures {
      max-height: 220px;
      overflow: hidden;
     }

     #keyFeatures ul {
      padding-inline-start: 22px;
      margin-block-start: 12px;
     }

     #featuresScreenDiv #keyFeatures li {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 29px;
      color: rgba(51, 51, 51, 0.72);
     }

     #screenshotsContainer {
       display: flex;
     }

     #screenshotsContainer button {
      border: none;
      width: 4em;
      
      transition: background-color 0.2s;
     }

     #screenshotsContainer button:hover {
       background-color: #bbbbbb;
     }

     #screenshotsContainer button svg {
      width: 28px;
      fill: #6b6969;
     }

     #screenshots {
      display: flex;
      scroll-snap-type: x mandatory;
      flex-wrap: wrap;
      flex-direction: column;
      overflow-x: scroll;

      width: 24em;
      height: 14em;

      -webkit-overflow-scrolling: touch
     }

     #screenshots div {
       display: flex;
       align-items: center;
       justify-content: center;
       scroll-snap-align: start;

       height: 14em;
       width: 100%;

       background:#efefef;
     }

     #screenshots img {
       height: 100%;
     }

     #screenshots::-webkit-scrollbar {
       display: none;
     }

     #tagsDiv {
      margin-top: 1em;
      margin-bottom: 1em;
     }

     #desc {
      width: 40em;
      font-size: 14px;
      color: #7E7E7E;
      text-overflow: ellipsis;
      overflow: hidden;
     }

     #logoContainer {
       display: flex;
     }

     infinite-carousel-wc {
      background: #f0f0f0;
      padding-top: 14px;
      padding-bottom: 14px;
      border-radius: 22px;
      max-width: 27em;
      min-height: 180px;
     }

     infinite-carousel-wc > div {
      display: flex;
      justify-content: center;
      align-items: center;
     }

     infinite-carousel-wc > div > img {
       max-width: 20em;
       object-fit: contain;
     }

      #tagsDiv span {
        background: grey;
        color: white;
        padding-left: 12px;
        padding-right: 12px;
        padding-bottom: 4px;
        font-weight: bold;
        border-radius: 24px;
        margin-right: 12px;
        padding-top: 1px;
      }

    #iosText {
      color: var(--install-button-color);
      margin: 2em;
      text-align: center;
      font-weight: bold;

      position: relative;
      bottom: 0;
    }

    @media(max-height: 780px) {
      #buttonsContainer {
        bottom: -1em;
        background: transparent;
      }
    }

      @media(min-width: 1445px) {
        #installModal {
          left: 22em;
          right: 22em;
        }
      }

      @media(min-width: 1800px) {
        #installModal {
          left: 26em;
          right: 26em;
        }
      }

      @media(min-width: 2000px) {
        #installModal {
          left: 38em;
          right: 38em;
        }
      }

      @media(max-width: 1220px) {
        #installModal {
          bottom: 0em;
          top: 0em;
          left: 0em;
          right: 0em;
          border-radius: 0px;

          animation-name: mobile;
          animation-duration: 250ms;
        }

        #screenshots {
          justify-content: center;
        }
      }

      @media (max-width: 962px) {

        #desc {
          display: none;
        }

        #headerContainer {
          margin-bottom: 24px;
        }

        #headerContainer img {
          height: 42px;
          width: 42px;
        }
      }

      @media (max-width: 800px) {

        #background {
          display: none;
        }

         #installModal {
           overflow: scroll;
           box-shadow: none;
         }

         infinite-carousel-wc {
           width: 100%;
         }

         #screenshotsContainer {
           width: 100%;
         }

         #screenshots img {
           height: 180px;
         }

         #buttonsContainer {
          display: flex;
          justify-content: center;
          bottom: 0;
          margin-bottom: 0;
          border-radius: 0;

          padding-top: 1em;
          padding-bottom: 1em;
         }

         #buttonsContainer #installButton {
           margin-right: 0px;
         }

        #featuresScreenDiv {
          flex-direction: column;
          align-items: flex-start;
          margin-right: 0px;
        }

        #headerContainer {
          margin: 20px;
        }

        #desc {
          display: none;
        }

        #contentContainer {
          margin-left: 20px;
          margin-right: 20px;
        }

        #headerContainer img {
          height: 60px;
          width: 60px;
          margin-right: 12px;
        }
      }

      @media(max-width: 400px) {
        #headerContainer h1 {
          font-size: 26px;
        }

        #headerContainer img {
          height: 40px;
          width: 40px;
        }

        #featuresScreenDiv h3 {
          font-size: 18px;
          margin-bottom: 0px;
        }

        #keyFeatures ul {
          margin-top: 0px;
        }
      }

    `;
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('beforeinstallprompt', (event) => this.handleInstallPromptEvent(event));
        document.onkeyup = (e) => {
            if (e.key === "Escape") {
                this.cancel();
            }
        };
    }
    async firstUpdated() {
        if (this.manifestpath) {
            try {
                await this.getManifestData();
            }
            catch (err) {
                console.error('Error getting manifest, check that you have a valid web manifest');
            }
        }
        if (this.deferredprompt === undefined) {
            // add listener once more
            window.addEventListener('beforeinstallprompt', (event) => this.handleInstallPromptEvent(event));
        }
    }
    handleInstallPromptEvent(event) {
        this.deferredprompt = event;
        this.hasprompt = true;
        event.preventDefault();
    }
    // Check that the manifest has our 3 required properties
    // If not console an error to the user and return
    checkManifest(manifestData) {
        if (!manifestData.icons || !manifestData.icons[0]) {
            console.error('Your web manifest must have atleast one icon listed');
            return;
        }
        if (!manifestData.name) {
            console.error('Your web manifest must have a name listed');
            return;
        }
        if (!manifestData.description) {
            console.error('Your web manifest must have a description listed');
            return;
        }
    }
    async getManifestData() {
        try {
            const response = await fetch(this.manifestpath);
            const data = await response.json();
            this.manifestdata = data;
            if (this.manifestdata) {
                this.updateButtonColor(this.manifestdata);
                this.checkManifest(this.manifestdata);
                return data;
            }
        }
        catch (err) {
            return null;
        }
    }
    updateButtonColor(data) {
        if (data.theme_color) {
            this.style.setProperty('--install-button-color', data.theme_color);
        }
    }
    scrollToLeft() {
        const screenshotsDiv = this.shadowRoot.querySelector("#screenshots");
        // screenshotsDiv.scrollBy(-10, 0);
        screenshotsDiv.scrollBy({
            left: -15,
            top: 0,
            behavior: 'smooth'
        });
    }
    scrollToRight() {
        const screenshotsDiv = this.shadowRoot.querySelector("#screenshots");
        console.log(screenshotsDiv);
        // screenshotsDiv.scrollBy(10, 0);
        screenshotsDiv.scrollBy({
            left: 15,
            top: 0,
            behavior: 'smooth'
        });
    }
    openPrompt() {
        this.openmodal = true;
        let event = new CustomEvent('show');
        this.dispatchEvent(event);
    }
    closePrompt() {
        this.openmodal = false;
        let event = new CustomEvent('hide');
        this.dispatchEvent(event);
    }
    shouldShowInstall() {
        const eligibleUser = !this.usecustom && this.isSupportingBrowser && this.hasprompt === true || this.isIOS;
        console.log('this.deferredprompt', this.deferredprompt);
        console.log('this.isSupportingBrowser', this.isSupportingBrowser);
        // return eligibleUser;
        return this.showopen || eligibleUser;
    }
    async install() {
        if (this.deferredprompt) {
            this.deferredprompt.prompt();
            let event = new CustomEvent('show');
            this.dispatchEvent(event);
            const choiceResult = await this.deferredprompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                console.log('Your PWA has been installed');
                this.cancel();
                this.installed = true;
                let event = new CustomEvent('hide');
                this.dispatchEvent(event);
                return true;
            }
            else {
                console.log('User chose to not install your PWA');
                this.cancel();
                // set installed to true because we dont 
                // want to show the install button to 
                // a user who chose not to install
                this.installed = true;
                let event = new CustomEvent('hide');
                this.dispatchEvent(event);
                return false;
            }
        }
        else {
            // handle else case
        }
    }
    cancel() {
        this.openmodal = false;
        if (this.hasAttribute('openmodal')) {
            this.removeAttribute('openmodal');
        }
        let event = new CustomEvent('hide');
        this.dispatchEvent(event);
    }
    render() {
        return html `
      ${this.usecustom === false && this.showopen || this.shouldShowInstall() && this.installed !== true ? html `<button id="openButton" @click="${() => this.openPrompt()}">
        <slot>
          ${this.installbuttontext}
        </slot>
      </button>` : null}

      ${this.openmodal ? html `<div id="background" @click="${() => this.cancel()}"></div>` : null}

      ${this.openmodal ?
            html `
          <div id="installModal">
          <div id="headerContainer">
          <div id="logoContainer">
            <img src="${this.iconpath ? this.iconpath : this.manifestdata.icons[0].src}" alt="App Logo"></img>

            <div id="installTitle">
              <h1>${this.manifestdata.name}</h1>

              <p id="desc">
              ${this.explainer}
            </p>
            </div>
          </div>

          <button id="closeButton" @click="${() => this.cancel()}">
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.33" fill-rule="evenodd" clip-rule="evenodd" d="M1.11932 0.357981C1.59693 -0.119327 2.37129 -0.119327 2.8489 0.357981L11.7681 9.27152L20.6873 0.357981C21.165 -0.119327 21.9393 -0.119327 22.4169 0.357981C22.8945 0.835288 22.8945 1.60916 22.4169 2.08646L13.4977 11L22.4169 19.9135C22.8945 20.3908 22.8945 21.1647 22.4169 21.642C21.9393 22.1193 21.165 22.1193 20.6873 21.642L11.7681 12.7285L2.8489 21.642C2.37129 22.1193 1.59693 22.1193 1.11932 21.642C0.641705 21.1647 0.641705 20.3908 1.11932 19.9135L10.0385 11L1.11932 2.08646C0.641705 1.60916 0.641705 0.835288 1.11932 0.357981Z" fill="#60656D"/>
            </svg>
          </button>
        </div>

        <div id="contentContainer">

        <div id="featuresScreenDiv">

          ${this.manifestdata.features ? html `<div id="keyFeatures">
            <h3>${this.featuresheader}</h3>
            <ul>
              ${this.manifestdata.features ? this.manifestdata.features.map((feature) => {
                return html `
                          <li>${feature}</li>
                        `;
            }) : null}
            </ul>
          </div>` : null}

          ${this.manifestdata.screenshots ?
                html `
            <div id="screenshotsContainer">
              <button @click="${() => this.scrollToLeft()}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"/></svg>
              </button>
                <section id="screenshots">
                  ${this.manifestdata.screenshots.map((screen) => {
                    return html `
                            <div><img alt="App Screenshot" src="${screen.src}"></div>
                          `;
                })}
                </section>
              <button @click="${() => this.scrollToRight()}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M284.9 412.6l138.1-134c6-5.8 9-13.7 9-22.4v-.4c0-8.7-3-16.6-9-22.4l-138.1-134c-12-12.5-31.3-12.5-43.2 0-11.9 12.5-11.9 32.7 0 45.2l83 79.4h-214c-17 0-30.7 14.3-30.7 32 0 18 13.7 32 30.6 32h214l-83 79.4c-11.9 12.5-11.9 32.7 0 45.2 12 12.5 31.3 12.5 43.3 0z"/></svg>
              </button>
            </div>
            ` : null}
          </div>

          <div>
            <h3>${this.descriptionheader}</h3>
            <p>${this.manifestdata.description}</p>
          </div>
        </div>

        ${!this.isIOS ? html `<div id="buttonsContainer">
          ${this.deferredprompt ? html `<button id="installButton" @click="${() => this.install()}">${this.installbuttontext} ${this.manifestdata.short_name}</button>` : html `<button @click="${() => this.cancel()}" id="installCancelButton">${this.cancelbuttontext}</button>`}
        </div>
          </div>` : html `<p id="iosText">${this.iosinstallinfotext}</p>`}
        `
            : null}
    `;
    }
};
__decorate([
    property()
], pwainstall.prototype, "manifestpath", void 0);
__decorate([
    property()
], pwainstall.prototype, "iconpath", void 0);
__decorate([
    property()
], pwainstall.prototype, "manifestdata", void 0);
__decorate([
    property({ type: Boolean })
], pwainstall.prototype, "openmodal", void 0);
__decorate([
    property({ type: Boolean })
], pwainstall.prototype, "showopen", void 0);
__decorate([
    property({ type: Boolean })
], pwainstall.prototype, "isSupportingBrowser", void 0);
__decorate([
    property({ type: Boolean })
], pwainstall.prototype, "isIOS", void 0);
__decorate([
    property({ type: Boolean })
], pwainstall.prototype, "installed", void 0);
__decorate([
    property({ type: Boolean })
], pwainstall.prototype, "hasprompt", void 0);
__decorate([
    property({ type: Boolean })
], pwainstall.prototype, "usecustom", void 0);
__decorate([
    property()
], pwainstall.prototype, "explainer", void 0);
__decorate([
    property()
], pwainstall.prototype, "featuresheader", void 0);
__decorate([
    property()
], pwainstall.prototype, "descriptionheader", void 0);
__decorate([
    property()
], pwainstall.prototype, "installbuttontext", void 0);
__decorate([
    property()
], pwainstall.prototype, "cancelbuttontext", void 0);
__decorate([
    property()
], pwainstall.prototype, "iosinstallinfotext", void 0);
__decorate([
    property()
], pwainstall.prototype, "deferredprompt", void 0);
pwainstall = __decorate([
    customElement('pwa-install')
], pwainstall);
export { pwainstall };
//# sourceMappingURL=pwa-install.js.map