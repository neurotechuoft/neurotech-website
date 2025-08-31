"use client"

import React, { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { Brain, Zap, Users } from 'lucide-react'
import styles from './new-horizontal-parallax.module.css'

interface PageProps {
  offset: number
  gradient: string
  onClick: () => void
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
}

const Page = ({ offset, gradient, onClick, title, subtitle, description, icon }: PageProps) => (
  <>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
      <div className={styles.slopeBegin} />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
      <div className={`${styles.slopeEnd} ${styles[gradient]}`} />
    </ParallaxLayer>

    <ParallaxLayer className={styles.text} offset={offset} speed={0.3}>
      <div className={styles.contentSection}>
        <div className="mb-6 text-6xl">
          {icon}
        </div>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </ParallaxLayer>
  </>
)

export default function NewHorizontalParallax() {
  const parallax = useRef<IParallax>(null)

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to)
    }
  }

  return (
    <div style={{ background: '#000' }}>
      <Parallax className={styles.container} ref={parallax} pages={3} horizontal>
        <Page 
          offset={0} 
          gradient="pink" 
          onClick={() => scroll(1)}
          title="Who We Are"
          subtitle="Passionate Innovators"
          description="We are a diverse community of undergraduate students at the University of Toronto Engineering, united by our passion for Neurotechnology. Our team combines expertise from various engineering disciplines with deep curiosity about the human brain and nervous system."
          icon={<Users className="w-16 h-16 text-pink-400" />}
        />
        <Page 
          offset={1} 
          gradient="teal" 
          onClick={() => scroll(2)}
          title="What We Do"
          subtitle="Bridging Science & Technology"
          description="We develop cutting-edge solutions that merge neuroscience with engineering principles. From brain-computer interfaces to assistive technologies, we create innovations that have real-world impact on people's lives, particularly focusing on neurological disorders and accessibility."
          icon={<Brain className="w-16 h-16 text-teal-400" />}
        />
        <Page 
          offset={2} 
          gradient="tomato" 
          onClick={() => scroll(0)}
          title="Our Mission"
          subtitle="Transforming Lives Through Innovation"
          description="We strive to make Neurotechnology accessible and impactful for undergraduates while developing solutions that transform lives. Through collaboration, research, and hands-on projects, we're shaping the future of how technology interfaces with the human brain."
          icon={<Zap className="w-16 h-16 text-orange-400" />}
        />
      </Parallax>
    </div>
  )
}
