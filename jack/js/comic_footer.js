// Themed footer, injected into every page's .writeFooter div.
(function () {
	var target = document.querySelector(".writeFooter");
	if (!target) return;
	var year = new Date().getFullYear();
	target.innerHTML = `
		<footer class="comic-footer">
			<p>&copy; ${year} Ailin Yu. All rights reserved.</p>
			<p>Please don't repost, redistribute, or train AI models on this comic.</p>
			<span class="powered">Powered by
				<a href="https://rarebit.neocities.org"><img src="img/rarebitlogo_small.png" height="14" alt="Rarebit" /></a>
			</span>
		</footer>
	`;
})();
