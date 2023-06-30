use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct User {
    pub avatar_url: String,
    pub name: String,
}

#[derive(Deserialize, Serialize)]
pub struct Org {
    id: u32,
    login: String,
    url: String,
    avatar_url: String,
}

#[derive(Deserialize, Serialize)]
pub struct Repo {
    id: u32,
    name: String,
    pub updated_at: String,
}

#[derive(Deserialize, Serialize)]
pub struct RepoReadme {
    pub content: String,
}

pub enum Url {
    WithBaseUrl(&'static str),
    WithParams(String)
}

impl Url {
    pub fn value(self) -> String {
        match self {
            Url::WithBaseUrl(url) => format!("https://api.github.com{url}"),
            Url::WithParams(url) => format!("https://api.github.com{}", url),
        }
    }
}
