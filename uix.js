class Pagination {

	constructor(container, pageSize = 10, maxButtons = 10, onChange = () => {}) {

		this.container = container;
		this.pageSize = pageSize;
		this.maxButtons = maxButtons;
		this.onChange = onChange;

		this.currentPage = 1;
		this.totalItems = 0;
	}

	setTotalItems(totalItems) {
		this.totalItems = totalItems;
		this.render();
	}

	setPage(page) {
		const pages = this.pages;
		this.currentPage = Math.min(Math.max(page, 1), pages);
		this.render();
	}

	get pages() {
		return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
	}

	async goto(page) {

		if (page === this.currentPage)
			return;

		this.currentPage = page;
		this.render();

		await this.onChange(page);

	}

	render() {

		const pages = this.pages;

		this.container.innerHTML = "";

		const addButton = (text, page, disabled = false, active = false) => {

			const btn = document.createElement("button");

			btn.textContent = text;
			btn.disabled = disabled;

			if (active)
				btn.classList.add("active");

			btn.onclick = () => this.goto(page);

			this.container.appendChild(btn);

		};

		addButton("«", 1, this.currentPage === 1);
		addButton("‹", this.currentPage - 1, this.currentPage === 1);

		let start = Math.max(1, this.currentPage - Math.floor(this.maxButtons / 2));
		let end = start + this.maxButtons - 1;

		if (end > pages) {
			end = pages;
			start = Math.max(1, end - this.maxButtons + 1);
		}

		if (start > 1) {
			addButton("1", 1);

			if (start > 2)
				this.container.append("...");
		}

		for (let i = start; i <= end; i++)
			addButton(i, i, false, i === this.currentPage);

		if (end < pages) {

			if (end < pages - 1)
				this.container.append("...");

			addButton(pages, pages);

		}

		addButton("›", this.currentPage + 1, this.currentPage === pages);
		addButton("»", pages, this.currentPage === pages);

	}

}
