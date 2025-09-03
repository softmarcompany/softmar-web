/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }

  // Siempre usar 'light' por defecto
  setTheme(getStoredTheme() || 'light')

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')
    if (!themeSwitcher) return

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) themeSwitcher.focus()
  }

  // Eliminamos la escucha de cambios del sistema para dark mode

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getStoredTheme() || 'light')

    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value')
        setStoredTheme(theme)
        setTheme(theme)
        showActiveTheme(theme, true)
      })
    })

    const container = document.querySelector('.image-container');
    const img1 = container.querySelector('.img1');
    const img2 = container.querySelector('.img2');

    let animando = true;

    container.addEventListener('click', function () {
      animando = !animando;
      if (animando) {
        img1.classList.add('animar');
        img2.classList.add('animar');
      } else {
        img1.classList.remove('animar');
        img2.classList.remove('animar');
      }
    });
  })
})()
