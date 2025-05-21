import 'package:flutter/material.dart';
import '../screens/splash_screen.dart';
import '../screens/login_screen.dart';
import '../screens/home_screen.dart';
import '../screens/sobre_screen.dart';
import '../screens/ajuda_screen.dart';
import '../screens/calculo_screen.dart';
import '../screens/simulacao_screen.dart';
import '../screens/regras_screen.dart';
import '../screens/quando_screen.dart';
import '../screens/historico_screen.dart';

class AppRoutes {
  static const splash = '/';
  static const login = '/login';
  static const home = '/home';
  static const sobre = '/sobre';
  static const ajuda = '/ajuda';
  static const calculo = '/calculo';
  static const simulacao = '/simulacao';
  static const regras = '/regras';
  static const quando = '/quando';
  static const historico = '/historico';

  static Map<String, WidgetBuilder> getRoutes() {
    return {
      splash: (context) => SplashScreen(),
      login: (context) => LoginScreen(),
      home: (context) => HomeScreen(),
      sobre: (context) => SobreScreen(),
      ajuda: (context) => AjudaScreen(),
      calculo: (context) => CalculoScreen(),
      simulacao: (context) => SimulacaoScreen(),
      regras: (context) => RegrasScreen(),
      quando: (context) => QuandoScreen(),
      historico: (context) => HistoricoScreen(),
    };
  }
}
