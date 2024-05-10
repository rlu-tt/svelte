<script lang="ts">

import { fade, scale } from 'svelte/transition';

type CharacterResult = {
  _id: string
  name: string
  wikiUrl: string
  race: string
  birth: string
  gender: string
  death: string
  hair: string
  height: string
  realm: string
  spouse: string
}

  let { data } = $props();

  let formattedData = data.data as CharacterResult[];

  formattedData = formattedData.map((character) => {
    for (const key in character) {
      if (character[key] === null) {
        character[key] = "Unknown";
      }
    }
    return character;
  });

  function handleClick(id: string) {
    showModal = true;
    currentCharacter = formattedData.find((character) => character._id === id)!;
  }

  function closeModal() {
    showModal = false;
  }

  let showModal = $state(false);
  let currentCharacter: CharacterResult = $state({} as CharacterResult);

</script>

<main class="flex flex-wrap gap-y-4 gap-x-4 m-4 justify-center">

  {#each formattedData as character}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div data-modal-target="default-modal" data-modal-toggle="default-modal" onclick={() => handleClick(character._id)} class="flex flex-col bg-slate-300 hover:bg-slate-200 rounded overflow-hidden shadow-lg cursor-pointer md:w-3/12 w-10/12">
    <div class="px-6 py-4">
      <h2 class="font-bold text-xl mb-2">{character.name}</h2>
      <p>Race: {character.race}</p>
      <p>Birth: {character.birth}</p>
    </div>
  </div>
  {/each}
</main>

{#if showModal}
  <div id="default-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden flex fixed left-0 top-0 h-full w-full z-50 justify-center content-start  items-center" in:scale out:scale >
    <div class="relative p-4 w-full max-w-xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentCharacter.name}
                </h2>
                <button onclick={() => closeModal()} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-4 md:p-5 space-y-4">
              <div>Race: { currentCharacter.race }</div>
              <div>Birth: { currentCharacter.birth }</div>
              <div>Death: { currentCharacter.death }</div>
              <div>Gender { currentCharacter.gender }</div>
              <div>Hair: { currentCharacter.hair }</div>
              <div>Height { currentCharacter.height }</div>
              <div>Realm: { currentCharacter.realm }</div>
              <div>Spouse: { currentCharacter.spouse }</div>
            </div>
            <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <a  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" target="_blank" href="{currentCharacter.wikiUrl}">WikiUrl</a>
                <button onclick={() => closeModal()} data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Close
                </button>
            </div>
        </div>
    </div>
  </div>
{/if}
