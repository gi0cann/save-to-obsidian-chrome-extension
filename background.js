chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
            vault_id = prompt("vault / vault id", "f75a1956aa3b5f1a");
            url = prompt("url", window.location.href);
            title = prompt("title", document.title);
            directory = prompt("enter directory");
            file_name = prompt("full file name", directory + title.replace(/[/\\?%*:|"<>]/g, '-'));
            tags = (() => {
                result = "";
                t = prompt("tags (comma seperated)").split(",");
                alert(t);
                t.forEach((element) => result = result.concat("- ", element, "\n"));
                alert(result);
                return result;
            })();
            content = `---
tags:
${tags}
---
# [${title}](${url})
`;
            uri = `obsidian://new?vault=${vault_id}&file=${encodeURI(file_name)}&content=` + encodeURI(content).replace("#", "%23");
            alert(uri);
            window.open(uri);
        }
    });
});
