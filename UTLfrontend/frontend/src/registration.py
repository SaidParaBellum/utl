from manim import *

class RegistrationAnimation(Scene):
    def construct(self):
        # Поле ввода
        input_box = RoundedRectangle(corner_radius=0.2, width=4, height=0.8, color=WHITE)
        input_text = Text("", font_size=28).move_to(input_box.get_center())
        input_box_group = VGroup(input_box, input_text).move_to(UP*1)

        # Кнопка
        button = RoundedRectangle(corner_radius=0.2, width=3.5, height=0.9, color=WHITE, fill_opacity=1, fill_color=BLUE)
        button_text = Text("Зарегистрироваться", font_size=24, color=WHITE).move_to(button.get_center())
        button_group = VGroup(button, button_text).next_to(input_box_group, DOWN, buff=1)

        # Добавляем поле
        self.play(Create(input_box))
        self.wait(0.5)

        # Анимация ввода текста "UTL School"
        target_text = "UTL School"
        for i in range(1, len(target_text)+1):
            partial_text = Text(target_text[:i], font_size=28).move_to(input_box.get_center())
            self.play(Transform(input_text, partial_text), run_time=0.15)
        self.wait(0.5)

        # Появление кнопки
        self.play(FadeIn(button_group))
        self.wait(0.5)

        # Имитация клика
        click_circle = Circle(radius=0.2, color=YELLOW).move_to(button.get_right() + LEFT*0.6)
        self.play(GrowFromCenter(click_circle), run_time=0.4)
        self.play(FadeOut(click_circle), button.animate.set_fill(GREEN, opacity=1), run_time=0.6)
        self.wait(1)


# Настройки экспорта
config.background_color = "#00000000"  # прозрачный фон
config.pixel_height = 1280
config.pixel_width = 720
config.frame_rate = 30
