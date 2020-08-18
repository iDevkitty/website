import React, { FC } from 'react';
import { gbmFeatures } from 'utils';
import { Icon } from '@blueprintjs/core';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

import css from './Features.module.scss';

const MotionDiv = motion.div;
const MotionImg = motion.img;

export const Features: FC = () => {
  const {scrollYProgress} = useViewportScroll()
  const imageTiming = [0, .2];
  const width = useTransform(scrollYProgress, imageTiming, ['100vw', '50vw'])
  const scale = useTransform(scrollYProgress, imageTiming, [1, .7])
  const opacity = useTransform(scrollYProgress, [.18, .31], [0, 1])

  let style = {};
  let style2 = {};
  if (window.innerWidth >= 800) {
    style = {
      width: width,
      scale,
    }
    style2 = {
      opacity,
    }
  }

  return (<div className={css.root}>
    <MotionDiv
      className={css.image}
      style={style}
    >
      <MotionImg
        src="/images/gbm-main.png"
        alt="app screenshot"
        animate={{
          scale: [0, 1]
        }}
      />
    </MotionDiv>

    <div className={css.imagePadding}/>

    <MotionDiv
      style={style2}
      id='features'
      className={css.block}
    >
      <div className={css.title}>Git Branch Manager</div>
      <div className={css.titleDesc}>Manage your projects with ease</div>

      {gbmFeatures.map(({icon, title, transition = {}, animate = {}, initial = {}}, index) => (
        <div
          key={index}
          className={css.featureItem}
        >
          <MotionDiv
            className={css.iconWrap}
            transition={transition}
            initial={initial as any}
            animate={animate}
          >
            <Icon
              className={css.icon}
              iconSize={28}
              icon={icon}
            />
          </MotionDiv>
          <span className={css.featureText}>{title}</span>
        </div>
      ))}
    </MotionDiv>
  </div>);
}