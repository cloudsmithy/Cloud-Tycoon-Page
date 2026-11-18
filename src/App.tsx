import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import Showcase from './components/Showcase'
import Modes from './components/Modes'
import Expansions from './components/Expansions'
import Roles from './components/Roles'
import Learn from './components/Learn'
import Videos from './components/Videos'
import Events from './components/Events'
import AuthorNote from './components/AuthorNote'
import Changelog from './components/Changelog'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import MobileCta from './components/MobileCta'
import { LightboxProvider } from './lib/lightbox'
import { VideoProvider } from './lib/video'

export default function App() {
  return (
    <VideoProvider>
      <LightboxProvider>
      <a className="skip-link" href="#main">
        跳到正文
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <Features />
        <Showcase />
        <Modes />
        <Expansions />
        <Roles />
        <Learn />
        <Videos />
        <Events />
        <AuthorNote />
        <Changelog />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
      </LightboxProvider>
    </VideoProvider>
  )
}
