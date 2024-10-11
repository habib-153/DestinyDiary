import TravelAnimation from "./Animation";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.banner}>
      {/* Zoom animation for the background */}
      <div className={styles.animateZoom} />
      <div className={styles.overlay}>
        {/* Your content goes here */}
        <div className="flex items-center flex-col lg:flex-row">
          <div className="flex-1 lg:pl-16">
            <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold text-white text-center lg:text-left">
              What&rsquo;s your next destiny?
            </h1>
            <p className="lg:text-lg text-white mt-6 mx-auto w-4/5 lg:w-auto text-center lg:text-left">
              🌟 Welcome to DestinyDiary! 📖 Join a vibrant community of destiny
              seekers eager to share their personal journeys, exchange insights,
              and connect with fellow explorers. Dive into a world of destiny
              inspiration and discover new paths through the experiences of
              those who’ve walked them. Let’s explore together!
            </p>
          </div>
          <div className="flex-1">
            <div className="lg:flex justify-center items-center hidden">
              <TravelAnimation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
