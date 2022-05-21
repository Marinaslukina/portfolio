document.addEventListener('DOMContentLoaded', () => {
	
	const menu = document.querySelector('.dropdown-menu');

	window.addEventListener('click', event => {
		
		if ((document.getElementById('dropdown').contains(event.target)) || (document.getElementById('dropdownMenuButton').contains(event.target))) {
			menu.style.display = 'block';
		} else {
			menu.style.display = 'none';
		}
	})

})