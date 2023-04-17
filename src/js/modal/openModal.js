'use strict';

import { fetchMovieById } from '../api/fetchMovieById';
import { addToLocalStorage } from '../localStorage/localStorage';
import { closeModal } from './closeModal';
import { markupData } from './modalMarkup';

const mainContent = document.querySelector('#main');

// funkcja otwierająca modal
const openModal = e => {
  // przerywa funkcję, jeśli zdarzenie nie występuje na elemencie z klasą "movie-card".
  if (!e.target.closest('.movie-card')) {
    return;
  }

  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');

  // pobranie id filmu z atrybutu "data-id" klikniętego elementu
  const movieId = e.target.closest('.movie-card').getAttribute('data-id');

  fetchMovieById(movieId)
    .then(movieData => {
      backdrop.innerHTML = markupData(movieData);

      // dodanie elementu backdrop do ciała dokumentu
      document.body.appendChild(backdrop);

      // blokuje możliwość skrolowania w momencie uruchomienia modala
      document.body.classList.add('overflow-off');

      const closeModalButton = document.querySelector('#modal__close');

      const watchedButton = document.getElementById('watched');
      const queueButton = document.getElementById('queue');
      /*
        Ten fragment kodu reaguje na kliknięcie przycisków "watchedButton" i "queueButton" i wywołuje 
        funkcję "addToLocalStorage" z odpowiednimi argumentami. Funkcja ta zapisuje identyfikator filmu 
        do lokalnego magazynu przeglądarki pod kluczem "user" i listą "watched" lub "queue", w zależności od przycisku, 
        który został kliknięty.
      */
      watchedButton.addEventListener('click', () =>
        addToLocalStorage(movieId, 'watched')
      );
      queueButton.addEventListener('click', () =>
        addToLocalStorage(movieId, 'queue')
      );
      // dodanie nasłuchiwania na zdarzenie 'click' do elementu `closeModalButton` z funkcją `closeModal`
      closeModalButton.addEventListener('click', closeModal);
    })
    .catch(error => {
      console.error(error);
    });
};

// dodanie nasłuchiwania na zdarzenie 'click' do elementu `mainContent` z funkcją `openModal`
mainContent.addEventListener('click', openModal);

export { openModal };
