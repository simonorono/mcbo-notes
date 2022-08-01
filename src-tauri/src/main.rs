#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .plugin(TauriSql::default().add_migrations(
            "sqlite:notes.db",
            vec![Migration {
                version: 1,
                description: "create notes table",
                sql: include_str!("../migrations/001.sql"),
                kind: MigrationKind::Up,
            }],
        ))
        .run(context)
        .expect("error while running tauri application");
}
