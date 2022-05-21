(() => {

    function ucFirst(str) {
		if (!str) return str;
		return str[0].toUpperCase() + str.slice(1);
	}

    function keyUp(input) {

        if (input.value.match(/[А-Яа-я-]+$/ig)) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        } else {
            input.value = input.value.replace(/[A-Za-z[.,*+;':"`~_/><?№^%!@#&${}()|[\]\\\d]+$/ig, '');
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        }
        
		return input;
	}


    document.addEventListener('DOMContentLoaded', () => {
		const form = document.querySelector('form');
		const inputs = document.querySelectorAll('.form-control');
        let str, p = '';

        inputs.forEach(input => {
			input.addEventListener('input', () => keyUp(input));
            input.addEventListener('blur', () => {
                str = ucFirst(input.value.replace(/^\s{1,}/, '').replace(/\s{1,}$/, '').replace(/\s+/g, ' ').replace(/(-){2,}/ig, '-').trim().toLowerCase())+ ' ';
                input.value = input.value.replace(/^\s{1,}/, '').replace(/\s{1,}$/, '').replace(/\s+/g, ' ').replace(/(-){2,}/ig, '-');
                p += str;
            })
		});

        form.addEventListener('submit', (event) => {

			event.preventDefault();

            const wrapper = document.querySelector('.container');
            const paragraph = document.createElement('p');
            paragraph.innerHTML = p;
            wrapper.append(paragraph);
            inputs.forEach(input => { 
                input.value = '';
            });

            str = '';
            p = '';

        })

    });

}) ();