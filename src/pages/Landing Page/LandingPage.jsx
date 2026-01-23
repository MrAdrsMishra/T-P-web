import { React,useState, useEffect, useRef, Suspense,lazy} from 'react';
import Navbar from './Navbar.js';
import Hero from './Hero.jsx';
import Footer from './Footer.jsx';
import useAuthStore from '../../store/user-auth-store/useAuthStore.js';

function LazySection({ component: Component }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{isVisible ? <Component /> : null}</div>;
}
 

export default function LandingPage() {
  const Features = lazy(() => import('./Features.jsx'));
  const HowItWorks = lazy(() => import('./HowItWorks.jsx'));
  const Testimonials = lazy(() => import('./Testimonials.jsx'));
  const FAQ = lazy(() => import('./FAQ.jsx'));
  const CallToAction = lazy(() => import('./CallToAction.jsx'));
  const notify = useAuthStore((state) => state.notify);

useEffect(async()=>{
  await notify();
},[])
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Suspense fallback={<div>Loading...</div>}>
          <LazySection component={Features} />
          <LazySection component={HowItWorks} />
          <LazySection component={Testimonials} />
          <LazySection component={FAQ} />
          <LazySection component={CallToAction} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
