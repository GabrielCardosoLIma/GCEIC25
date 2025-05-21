import 'package:flutter/material.dart';

ThemeData buildAppTheme() {
  return ThemeData(
    primarySwatch: Colors.teal,
    scaffoldBackgroundColor: Color(0xFFF5F5F5),
    fontFamily: 'OpenSans',
    textTheme: const TextTheme(
      headlineLarge: TextStyle(fontSize: 42, fontWeight: FontWeight.bold),
      headlineMedium: TextStyle(fontSize: 32, fontWeight: FontWeight.w400),
      titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
      bodyMedium: TextStyle(fontSize: 16, color: Colors.black87),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.teal,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
      ),
    ),
  );
}
