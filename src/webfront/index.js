const main = async () => {
    const data = await fetch(`${location.host}/api`);
    document.body.textContent = data;
};

main();