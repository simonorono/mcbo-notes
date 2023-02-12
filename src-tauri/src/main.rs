#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri_plugin_sql::{Migration, MigrationKind};

fn main() {
    let context = tauri::generate_context!();

    let sqlite_plugin = tauri_plugin_sql::Builder::default()
        .add_migrations(
            "sqlite:notes.db",
            vec![Migration {
                version: 1,
                description: "create notes table",
                sql: include_str!("../migrations/001.sql"),
                kind: MigrationKind::Up,
            }],
        )
        .build();

    tauri::Builder::default()
        .plugin(sqlite_plugin)
        .run(context)
        .expect("error while running tauri application");
}
