import 'package:flutter/material.dart';
import 'core/theme.dart';
import 'core/routes.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aposentadoria Fácil',
      debugShowCheckedModeBanner: false,
      initialRoute: AppRoutes.splash,
      routes: AppRoutes.getRoutes(),
      theme: buildAppTheme(),
    );
  }
}
